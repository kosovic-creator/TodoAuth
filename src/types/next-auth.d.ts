/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  }
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    }
  }
}