import { Axios } from "@/lib/axios/axios"
import { IPost } from "@/models/post";
import { AxiosError } from "axios";

interface IGetFeed{
    username: string;
    onlyfriends?: boolean
}

export const getFeed = async ({username, onlyfriends = false}: IGetFeed) => {
    try {
        const { data } = await Axios.get<{data: IPost[]}>(`/feed/${username}?onlyfriends=${onlyfriends}`);
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}