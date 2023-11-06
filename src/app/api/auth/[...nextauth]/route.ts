import NextAuth, { NextAuthOptions } from 'next-auth';
import { setCookie } from 'nookies';
import Credentials from 'next-auth/providers/credentials';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                uniquekey: { label: 'Nome de Usuário ou E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials, req) {
                const response = await fetch('http://localhost:3333/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uniquekey: credentials?.uniquekey,
                        password: credentials?.password
                    })
                })

                const user = await response.json();

                if(user){
                    setCookie(undefined, 'simplesocial.accessToken', user.accessToken, {
                        maxAge: 60 * 60 * 1 // 1 hour
                    })
                    setCookie(undefined, 'simplesocial.refreshToken', user.refreshToken, {
                        maxAge: 60 * 60 * 48 // 48 hours
                    })
                    return user.user;
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