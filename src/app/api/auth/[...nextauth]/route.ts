import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signIn } from '@/services/api/auth/sign-in';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                uniquekey: { label: 'Nome de Usuário ou E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials) {
                const response = await signIn({
                    uniquekey: credentials?.uniquekey as string,
                    password: credentials?.password as string
                })

                if(response instanceof Error){
                    return null;
                }

                return response as any;
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