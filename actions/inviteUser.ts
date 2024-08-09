"use server"
import * as z from "zod";
import { InviteUserSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { sendInviteEmail, verifyEmail } from "@/lib/mail";
import { generatePass, generateUsername } from "@/lib/utils";


export const inviteUser = async (values: z.infer<typeof InviteUserSchema>) => {
    const checkedFields = InviteUserSchema.safeParse(values);

    if(!checkedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { email } = checkedFields.data as typeof values;
    
    const existingUser = await getUserByEmail(email);
    if(existingUser) return { type: 'error', message: "User already exists" } as formFlashProps;

    const generatedPassword = generatePass()
    const generatedUsername = "user" + generateUsername();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = await db.user.create({
        data: 
        {
            name: generatedUsername,
            email,
            password: hashedPassword
        }
   });

   if(!newUser) return { type: 'error', message: "Something went wrong" } as formFlashProps;

    const emailResponse = await sendInviteEmail(email, generatedPassword, generatedUsername);
    if(emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;

    return { type: 'success', message: "Invite email sent" } as formFlashProps;
}