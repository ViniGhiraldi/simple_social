import { IImage } from "@/models/image";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
    nickname: string;
    email: string;
    profilePicture?: IImage;
    description?: string;
    banner?: IImage;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user?: User
  }
}