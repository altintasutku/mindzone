import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                return null
            },
        }),
    ],
    // callbacks: {
    //     async session({ token, session }) {
            
    //     },

    //     async jwt({ token, user }) {
            
    //     },
    //     redirect() {
    //         return '/'
    //     },
    // },
}

export const getAuthSession = () => getServerSession(authOptions)
