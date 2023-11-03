'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { IUsuario } from "@/models/usuario";
import { useRouter } from "next/navigation";

interface ISignIn{
    uniquekey: string;
    password: string;
}

interface IAuthContext{
    user: IUsuario | null;
    isAuthenticated: boolean;
    signIn: (data: ISignIn) => Promise<void>
}

const AuthContext = createContext({} as IAuthContext)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUsuario | null>(null)
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'simplesocial.refreshToken': currentRefreshToken } = parseCookies();

        if(currentRefreshToken) {
            fetch('http://localhost:3333/refreshtoken', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${currentRefreshToken}`
                }
            }).then(data => data.json()).then(data => setUser(data.user))
            .catch(err => console.log(err))
        }

    }, [])

    const signIn = async ({ uniquekey, password }: ISignIn) => {
        const body = {uniquekey, password}

        const data = await fetch('http://localhost:3333/signin', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        })

        const { accessToken, refreshToken, user } = await data.json()

        setCookie(undefined, 'simplesocial.accessToken', accessToken, {
            maxAge: 60 * 60 * 1 // 1 hour
        })

        setCookie(undefined, 'simplesocial.refreshToken', refreshToken, {
            maxAge: 60 * 60 * 48 // 48 hours
        })

        //api.defaults.headers['Authorization'] = `Bearer ${accessToken}`

        setUser(user)

        router.push('/')
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}