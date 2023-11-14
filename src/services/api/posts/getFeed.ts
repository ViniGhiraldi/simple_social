import { Axios } from "@/lib/axios/axios"
import { IPost } from "@/models/post";
import { AxiosError } from "axios";

interface IGetFeed{
    username: string;
}

export const getFeed = async ({username}: IGetFeed) => {
    try {
        const { data } = await Axios.get<{data: IPost[]}>(`/feed/${username}`);
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}