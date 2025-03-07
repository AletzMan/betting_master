import NextAuth, { Account, User } from "next-auth"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserSession } from "../types/types";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET

    }),
    Twitter({
        clientId: process.env.AUTH_TWITTER_ID,
        clientSecret: process.env.AUTH_TWITTER_SECRET

    })],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // 1. Consultar la base de datos 
            const dbUser = await prisma.user.findUnique({
                where: { email: user.email as string },
            });

            // 2. Si el usuario no existe, crearlo
            if (!dbUser) {
                await prisma.user.create({
                    data: {
                        name: user.name as string,
                        email: user.email as string,
                        image: user.image as string,
                        account: "",
                        color: "#64b5f6",
                    },
                });
            } else {
                await prisma.user.update({
                    where: { email: user.email as string },
                    data: { last_login: new Date() },
                });

            }

            return true; // Permitir el inicio de sesión
        },
        async jwt({ token, account, user, profile }) {
            // 3. Agregar datos del usuario al token JWT
            if (account) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email as string },
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.email = dbUser.email;
                    token.user = {
                        id: dbUser.id,
                        name: dbUser.name,
                        email: dbUser.email,
                        image: dbUser.image,
                        notifications: dbUser.notifications,
                        color: dbUser.color,
                        account: dbUser.account,
                        total_bets: dbUser.total_bets,
                        bets_won: dbUser.bets_won,
                        finals_won: dbUser.finals_won,
                        last_login: dbUser.last_login,
                        emailVerified: profile?.email_verified
                    }
                }
            }
            return token;
        },
        async session({ session, token }) {
            // 4. Agregar datos del usuario a la sesión
            session.user = token.user as UserSession
            return session;
        },
    }
})