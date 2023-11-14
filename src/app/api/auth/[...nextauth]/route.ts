import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Axios } from '@/lib/axios/axios';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                uniquekey: { label: 'Nome de Usuário ou E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials) {
                const response = await Axios.post('http://localhost:3333/signin', {
                    uniquekey: credentials?.uniquekey,
                    password: credentials?.password
                })

                if(response.status === 202 || response.status === 200){
                    return response.data
                }

                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            const customUser = user as unknown as {accessToken: string; refreshToken: string; user: User}
            if(user){
                return {
                    ...token,
                    accessToken: customUser.accessToken,
                    refreshToken: customUser.refreshToken,
                    username: customUser.user.username,
                    nickname: customUser.user.nickname,
                    email: customUser.user.email,
                    profilePicture: customUser.user.profilePicture,
                    description: customUser.user.description,
                    banner: customUser.user.banner
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