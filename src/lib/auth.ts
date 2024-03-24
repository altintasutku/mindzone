import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { loginValidator } from "./validators/auth";
import axios from "axios";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = loginValidator.parse(credentials);

          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/authentication`,
            {
              username: email,
              password,
            }
          );

          if (data) {
            return { ...data.authUser, accessToken: data.token };
          }
        } catch (error) {}

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.id = parseInt(user.id.toString());
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.surname = user.surname;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          username: token.username,
          surname: token.surname,
          accessToken: token.accessToken,
        },
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
