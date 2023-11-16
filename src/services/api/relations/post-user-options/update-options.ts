import { Axios } from "@/lib/axios/axios"
import { IPostUsersOptions } from "@/models/post-users-options";
import { AxiosError } from "axios";

interface IUpdateOptions extends Omit<IPostUsersOptions, 'userId'>{}

export const updateOptions = async ({postId, liked, favorited}: IUpdateOptions) => {
    try {
        const { data } = await Axios.put<{data: IPostUsersOptions}>('/options', {postId, liked, favorited});
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}