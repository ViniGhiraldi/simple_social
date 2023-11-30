import { Axios } from "@/lib/axios/axios";
import { IUsuario } from "@/models/usuario";
import { AxiosError } from "axios";

interface ISignIn{
    uniquekey: string;
    password: string;
}

interface ISignInResponse{
    accessToken: string;
    refreshToken: string;
    user: IUsuario;
}

export const signIn = async ({uniquekey, password}: ISignIn) => {
    try {
        const { data, status } = await Axios.post<ISignInResponse>('/signin', {uniquekey, password});

        if(status === 202) return data;

        return new Error('E-mail ou senha inválido(s).');
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}