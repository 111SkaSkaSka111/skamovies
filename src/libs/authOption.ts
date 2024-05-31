import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@mail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // cek apakah user sudah ada di database
                const user = await prisma.user.findUnique({ where: { email: credentials?.email } });

                if (!user) {
                    return null;
                }

                // cek apakah password user cocok menggunakan compare
                const isPasswordValid = await compare(credentials?.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: `${user.id}`,
                    email: `${user.email}`,
                    name: `${user.username}`,
                    image: `${user.image}`,
                };
            },
        }),
    ],
};

export default NextAuth(authOptions);
