import { IImage } from "./image";

export interface IUsuario{
    username: string;
    nickname: string;
    email: string;
    profilePicture?: IImage;
    banner?: IImage;
    description?: string;
}