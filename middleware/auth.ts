import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/middleware/auth.config";
import { db } from "@/lib/db"
import { getUserById } from "@/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Roles } from "@prisma/client";
import { get2FConfirmatonByUserId } from "@/data/tokens";


export type ExtendedUser = DefaultSession["user"] & {
    role: Roles,
    is2FEnabled: boolean
};

export type EdittedUserSessionDetails = Omit<ExtendedUser, "password" | "createdAt" | "updatedAt" > & {
    emailVerified: Date
}

declare module "next-auth" {
    interface Session {
        user: EdittedUserSessionDetails
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
            const { password, createdAt, updatedAt, ...editedUserDetails } = user || {};
 
            token.details = editedUserDetails;

            return token;
        },
        async session ({ session, token }){
            if(token.sub && token.details && session.user){
                console.log(token, session, 2332)
                // session.user.
                session.user = token.details as EdittedUserSessionDetails;
            }

            console.log(session, 666);
            return session;
        },
        async signIn({ user, account }){
            if(account?.provider === 'credentials'){
                const existingUser = await getUserById(user?.id as string);
    
                // if email is not verified, do not login
                if(!existingUser || !existingUser.emailVerified) return false 

                if(existingUser.is2fEnabled){
                    const confirmedOtp = await get2FConfirmatonByUserId(existingUser.id);
            
                    // if user hasn't confirmed otp
                    if(!(!!confirmedOtp)) return false;

                    await db.twoFactorConfirmation.delete({
                        where: { userId: existingUser?.id }
                    });
                }
            }

            return true;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    ...authConfig
})