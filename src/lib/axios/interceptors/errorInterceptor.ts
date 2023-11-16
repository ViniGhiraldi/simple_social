import { AxiosError, AxiosRequestConfig } from "axios";
import { Axios } from "../axios";
import { parseCookies, setCookie } from "nookies";
import { refreshToken } from "@/services/api/auth/refresh-token";

export const errorInterceptor = async (error: AxiosError) => {
    console.log(error)
    if(error.response?.status === 401){
        try {
            const data = await refreshToken();

            if(data instanceof Error) return Promise.reject(new Error(data.message));
            
            setCookie(undefined, 'simplesocial.accessToken', data.accessToken, {
                maxAge: 60 * 60 * 1, // 1 hour
                path: '/'
            })

            setCookie(undefined, 'simplesocial.refreshToken', data.refreshToken, {
                maxAge: 60 * 60 * 48, // 48 hours
                path: '/'
            })

            Axios.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`

            return Axios(error.config as AxiosRequestConfig)
        } catch (error) {
            return Promise.reject(new Error((error as AxiosError).message));
        }
    }

    return Promise.reject(new Error(error.message));
}