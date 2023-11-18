import { IUsuario } from "./usuario";

interface IUserForPostComment extends Pick<IUsuario, 'username' | 'nickname' | 'profilePicture'>{}

export interface IPostComment{
    id: number;
    userId: string;
    postId: number;
    comment: string;
    createdAt: Date;
    user: IUserForPostComment
}