import { AxiosError } from "axios";
import { Axios } from "../axios";
import { parseCookies, setCookie } from "nookies";

export const errorInterceptor = async (error: AxiosError) => {
    if(error.status === 401){
        const {'simplesocial.refreshToken': refreshToken} = parseCookies()
        
        try {
            const { data } = await Axios.post('/refreshtoken', {}, {headers: {Authorization: `Bearer ${refreshToken}`}})
            
            setCookie(undefined, 'simplesocial.accessToken', data.accessToken, {
                maxAge: 60 * 60 * 1, // 1 hour
                path: '/'
            })

            setCookie(undefined, 'simplesocial.refreshToken', data.refreshToken, {
                maxAge: 60 * 60 * 48, // 48 hours
                path: '/'
            })

            Axios.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(new Error((error as AxiosError).message));
        }
    }

    return Promise.reject(new Error(error.message));
}