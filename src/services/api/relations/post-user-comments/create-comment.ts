import { Axios } from "@/lib/axios/axios"
import { IPostComment } from "@/models/post-comment";
import { AxiosError } from "axios";

interface ICreateComment extends Pick<IPostComment, 'postId' | 'comment'>{}

export const createComment = async ({postId, comment}: ICreateComment) => {
    try {
        const { data } = await Axios.post<{data: IPostComment}>('/comment', {postId, comment});
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}