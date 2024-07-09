"use server"
import * as z from "zod";
import { RegisterSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { verifyEmail } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const checkedFields = RegisterSchema.safeParse(values);

    if(!checkedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { username, email, password } = checkedFields.data as typeof values;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await getUserByEmail(email);

    if(existingUser) return { type: 'error', message: "User already exists" } as formFlashProps;

    const newUser = await db.user.create({
        data: 
        {
            name: username,
            email,
            password: hashedPassword
        }
   });

    const emailResponse = await verifyEmail(email, newUser?.name as string);
    if(emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;

    return { type: 'success', message: "Confirmation email sent" } as formFlashProps;
}