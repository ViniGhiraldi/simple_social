import { Axios } from "@/lib/axios/axios"
import { IUsuario } from "@/models/usuario";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";

export const refreshToken = async () => {
    try {
        const {'simplesocial.refreshToken': refreshToken} = parseCookies();

        const { data } = await Axios.post<{accessToken: string; refreshToken: string; user: IUsuario}>('/refreshtoken', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        
        return data;
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}