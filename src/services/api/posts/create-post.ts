import { Axios } from "@/lib/axios/axios"
import { IPost } from "@/models/post";
import { AxiosError } from "axios";

interface ICreatePost{
    title: string;
    media?: File;
}

export const createPost = async ({title, media}: ICreatePost) => {
    try {
        const form = new FormData();
        form.append('title', title);
        if(media) form.append('media', media);
        

        const { data } = await Axios.post<{data: IPost}>('/post', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}