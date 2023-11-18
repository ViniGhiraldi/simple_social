import { IPostComment } from "./post-comment";
import { IPostUsersOptions } from "./post-users-options";
import { IUsuario } from "./usuario";

export interface IUsuarioForPost extends Pick<IUsuario, 'username' | 'nickname' | 'profilePicture'>{}

export interface IPost{
    id: number;
    media?: string;
    title: string;
    userId: string;
    createdAt: Date;
    postUser: IPostUsersOptions[];
    postComments: IPostComment[];
    user: IUsuarioForPost;
    _count: {
        postUser: number;
        postComments: number;
    }
}