import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/middleware/auth.config";
import { db } from "@/lib/db"
import { getUserById } from "@/lib/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Roles } from "@prisma/client";
import credentials from "next-auth/providers/credentials";

export type ExtendedUser = DefaultSession["user"] & {
    role: Roles
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

export const {
    handlers: { GET, POST  },
    auth, signIn, signOut,
} = NextAuth({
    pages:{
        signIn: "/login",
        error: "/login"
    },
    events:{
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user?.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks:{
        async jwt({ token }){
            if(!token?.sub) return token;

            const user = await getUserById(token?.sub as string);

            if(!user) return token;
            token.role = user?.role;

            return token;
        },
        async session ({ session, token }){
            if(token.sub && token.role && session.user){
                session.user.id = token?.sub as string;
                session.user.role = token.role as Roles;
            }

            console.log(session);
            return session;
        },
        async signIn({ user, account }){
            if(account?.provider == 'credentials'){
                const existingUser = await getUserById(user?.id as string);
    
                if(!existingUser || !existingUser.emailVerified){
                    return false // if email is not verified, do not login
                }
            }

            // TODO: 2FA check

            return true;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    ...authConfig
})