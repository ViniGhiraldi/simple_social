import axios from 'axios';
import { parseCookies } from 'nookies';
import { errorInterceptor } from './interceptors/errorInterceptor';

const {'simplesocial.accessToken': accessToken} = parseCookies()

export const Axios = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        "Content-Type": "application/json"
    }
})

if(accessToken) {
    Axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
}

Axios.interceptors.response.use(
    res => res,
    error => errorInterceptor(error)
)