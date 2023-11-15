import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
    nickname: string;
    email: string;
    profilePicture?: string;
    description?: string;
    banner?: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user?: User
  }
}