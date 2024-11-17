import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const {auth,handlers: {GET,POST}} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(`test: ${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`);
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                        username: credentials?.username,
                        password: credentials?.password,
                    }, { withCredentials: true });
                    if (res.status === 200) {
                        const user = {
                            id: res.data.user_id,
                            name: res.data.username,
                        };
                        const access_token = res.data.access_token;
                        const refresh_token = res.data.refresh_token;
                        cookies().set({
                            name: "access_token",
                            value: access_token,
                            httpOnly: true,
                            maxAge: 15 * 60, // 15 minutes in seconds
                            path: "/",
                            sameSite: "strict",
                            expires: new Date(Date.now() + 15 * 60 * 1000),
                            secure: true,
                        })
                        cookies().set({
                            name: "refresh_token",
                            value: refresh_token,
                            httpOnly: true,
                            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
                            path: "/",
                            sameSite: "strict",
                            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            secure: true,
                        })
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name;
            }
            return session;
        }
    }
});