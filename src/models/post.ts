import { IPostComment } from "./postComment";
import { IPostUsersOptions } from "./postUsersOptions";
import { IUsuario } from "./usuario";

export interface IUsuarioForPost extends Omit<IUsuario, 'email' & 'banner' & 'description'>{}

export interface IPost{
    id: number;
    media?: JSON;
    title: string;
    userId: string;
    createdAt: Date;
    postUser: IPostUsersOptions[];
    postComments: IPostComment[];
    user: IUsuarioForPost;
}