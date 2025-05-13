import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import {db} from "@/lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import  schema  from "@/types/usersSchema";


// Extend the User type to include the role property
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = schema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          },

        }

      );
      // redirect("/todo");
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      // Dodajemo role u token kada postoji user (znači na login)
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // Dodaj i session callback da bi role bio dostupan na frontendu
    async session({ session, token }) {
      if (token?.role && typeof token.role === "string") {
        session.user.role = token.role;
      }
      return session;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});