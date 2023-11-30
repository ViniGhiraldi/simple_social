import { Axios } from "@/lib/axios/axios";
import { IUsuario } from "@/models/usuario";
import { AxiosError } from "axios";

interface ISignIn{
    username: string;
    nickname: string;
    email: string;
    password: string;
}

export const signUp = async ({username, nickname, email, password}: ISignIn) => {
    try {
        const form = new FormData();
        form.append("username", username);
        form.append("nickname", nickname);
        form.append("email", email);
        form.append("password", password);

        const { data, status } = await Axios.post<{data: Omit<IUsuario, 'password'>}>('/signup', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

        if(status === 201) return data.data;

        return new Error('Parâmetros inválidos.');
    } catch (error) {
        return new Error((error as AxiosError).message);
    }
}