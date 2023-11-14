import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
    nickname: string;
    email: string;
    profilePicture: JSON;
    description: string;
    banner: JSON;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user?: User
  }
}