import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
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
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        uniquekey: credentials?.uniquekey,
                        password: credentials?.password
                    })
                })

                const user = await response.json();

                if(user && response.ok){
                    return user;
                }

                return null;
            },
        })
    ],
    pages: {
        signIn: '/login'
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST };