import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Token {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresAt: number;
  error?: string;
}

interface Account {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_at: number;
}

interface User {
  id: string;
  email: string;
  name: string;
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
  secret: process.env.NEXTAUTH_SECRET!,
  session: { maxAge: 60 * 30 },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token = {
          ...token,
          accessToken: (account as Account).access_token,
          idToken: (account as Account).id_token,
          refreshToken: (account as Account).refresh_token,
          expiresAt: (account as Account).expires_at,
        };
      }
      if (user) {
        token.id = (user as User).id;
      }
      if (Date.now() < token.expiresAt * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          token = await requestRefreshOfAccessToken(token as Token);
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = (token as Token).accessToken;
      session.user.id = (token as Token).id;
      return session;
    },
    async signIn({ user, account, profile }) {
      const email = (user as User).email;
      if (email) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: (user as User).email,
              name: (user as User).name,
            },
          });
          (user as User).id = newUser.id;
        } else {
          (user as User).id = existingUser.id;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
