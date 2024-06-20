import KeycloakProvider from "next-auth/providers/keycloak";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions, Session, User, Account, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

interface Token {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number;
  id?: string; // Añadir la propiedad 'id'
  error?: string;
}

async function requestRefreshOfAccessToken(token: Token): Promise<Token> {
  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
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

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: { maxAge: 60 * 30 },
  callbacks: {
    async jwt({ token, account, user }) {
      let newToken = token as unknown as Token;
      if (account) {
        newToken = {
          ...newToken,
          accessToken: account.access_token!,
          idToken: account.id_token!,
          refreshToken: account.refresh_token!,
          expiresAt: account.expires_at!,
        };
      }
      if (user) {
        newToken.id = user.id; // Añadir el ID del usuario al token
      }
      if (Date.now() < newToken.expiresAt * 1000 - 60 * 1000) {
        return newToken as unknown as JWT;
      } else {
        try {
          newToken = await requestRefreshOfAccessToken(newToken);
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...newToken, error: "RefreshAccessTokenError" } as unknown as JWT;
        }
      }
      return newToken as unknown as JWT;
    },
    async session({ session, token }) {
      (session as Session & { accessToken?: string }).accessToken = (token as unknown as Token).accessToken;
      if (session.user) {
        (session.user as { id?: string }).id = (token as any).id; // Añadir el ID del usuario a la sesión
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      const email = user.email;
      if (email) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
            },
          });
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
