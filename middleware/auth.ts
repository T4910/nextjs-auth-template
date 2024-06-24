import NextAuth from "next-auth";
import authConfig from "@/middleware/auth.config";
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
    handlers: { GET, POST  },
    auth, signIn, signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    ...authConfig
})