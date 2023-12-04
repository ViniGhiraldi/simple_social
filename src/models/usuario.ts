import { IImage } from "./image";
import { IPost } from "./post";
import { IUsersFollows } from "./users-follows";

export interface IPostForUsuario extends Pick<IPost, 'id' | 'title' | 'media' | 'createdAt'>{}

export interface IUsuario {
    username: string;
    nickname: string;
    email: string;
    profilePicture?: IImage;
    banner?: IImage;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    followerUser?: IUsersFollows[];
    followedUser?: IUsersFollows[];
    posts?: IPostForUsuario[];
    _count?: {
        posts?: number,
        userPost?: number,
        followerUser?: number,
        followedUser?: number,
        postComments?: number
    }
}