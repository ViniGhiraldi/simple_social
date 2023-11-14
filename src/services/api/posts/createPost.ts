import { Axios } from "@/lib/axios/axios"
import { IPost } from "@/models/post";
import { AxiosError } from "axios";

interface ICreatePost{
    title: string;
    media: string;
}

export const createPost = async ({title, media}: ICreatePost) => {
    try {
        const { data } = await Axios.post<{data: IPost}>('/post', {title, media});
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}