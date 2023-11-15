import { IPostComment } from "./post-comment";
import { IPostUsersOptions } from "./post-users-options";
import { IUsuario } from "./usuario";

export interface IUsuarioForPost extends Omit<IUsuario, 'email' & 'banner' & 'description'>{}

export interface IPost{
    id: number;
    media?: string;
    title: string;
    userId: string;
    createdAt: Date;
    postUser: IPostUsersOptions[];
    postComments: IPostComment[];
    user: IUsuarioForPost;
}