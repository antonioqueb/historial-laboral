import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Extendemos el tipo `Session` para incluir `accessToken`
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      email?: string;
      name?: string;
    };
  }
}

const prisma = new PrismaClient();

async function requestRefreshOfAccessToken(token: JWT): Promise<JWT> {
  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    }),
    method: "POST",
  });

  const tokens = await response.json();
  if (!response.ok) throw tokens;

  return {
    ...token,
    accessToken: tokens.access_token,
    idToken: tokens.id_token,
    refreshToken: tokens.refresh_token || token.refreshToken,
    expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: { maxAge: 60 * 30 },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token = {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at as number,
        };
      }
      if (user) {
        token.id = user.id;  // Asegúrate de agregar el ID del usuario al token
      }
      if (Date.now() < (token.expiresAt as number) * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          token = await requestRefreshOfAccessToken(token);
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = session.user || {}; // Asegurarse de que session.user esté definido
      session.user.id = token.id;  // Asegúrate de que el ID del usuario esté en la sesión
      return session;
    },
    async signIn({ user, account, profile }) {
      const email = user.email;
      if (email) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
            },
          });
          user.id = newUser.id;  // Asigna el nuevo ID de usuario
        } else {
          user.id = existingUser.id;  // Asigna el ID del usuario existente
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};

const handler = (req: NextRequest) => NextAuth(authOptions)(req, new NextResponse());
export { handler as GET, handler as POST };
