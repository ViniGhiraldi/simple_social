export interface IPostComment{
    id: number;
    userId: string;
    postId: number;
    comment: string;
    createdAt: Date;
}