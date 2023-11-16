import { Axios } from "@/lib/axios/axios"
import { IPostUsersOptions } from "@/models/post-users-options";
import { AxiosError } from "axios";

interface ICreateOptions extends Omit<IPostUsersOptions, 'userId'>{}

export const createOptions = async ({postId, liked, favorited}: ICreateOptions) => {
    try {
        const { data } = await Axios.post<{data: IPostUsersOptions}>('/options', {postId, liked, favorited});
        
        return data.data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}