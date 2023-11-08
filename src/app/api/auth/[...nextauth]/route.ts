import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { setCookie } from 'nookies';
import Credentials from 'next-auth/providers/credentials';
import { Axios } from '@/lib/axios';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                uniquekey: { label: 'Nome de Usuário ou E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials, req) {
                interface IResponse {
                    accessToken: string;
                    refreshToken: string;
                    user: User
                }

                const response = await Axios.post<IResponse>('http://localhost:3333/signin', {
                    uniquekey: credentials?.uniquekey,
                    password: credentials?.password
                })

                if(response.status === 202 || response.status === 200){
                    return response.data.user
                }

                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            console.log(user)
            if(user){
                return {
                    ...token,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    description: user.description,
                    banner: user.banner
                }
            }

            return {...token};
        },
        session: async ({session, token}) => {
            return {
                ...session,
                user: {
                    ...token
                }
            }
        },
    },
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST };