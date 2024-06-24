"use server"
import * as z from "zod";
import { RegisterSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import bcrypt from "bcryptjs";
import { db, getUserByEmail } from "@/lib/db";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { username, email, password } = validatedFields.data as typeof values;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) return { type: 'error', message: "User already exists"} as formFlashProps;

    await db.user.create({
        data: {
            name: username,
            email,
            password: hashedPassword
        }
    })


    // TODO: send a verification token email

    return { type: 'success', message: "Valid fields"} as formFlashProps;
}