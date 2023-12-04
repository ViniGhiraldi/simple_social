import { IImage } from "@/models/image";
import { IUsuario } from "@/models/usuario";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User extends IUsuario {
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user?: User
  }
}