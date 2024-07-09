"use server"
import { z } from "zod";
import { RequestResetSchema, PasswordResetSchema } from "@/middleware/schema";
import { getUserByEmail } from "@/data/user";
import { formFlashProps } from "@/components/auth/formFlash";
import { initPassReset, verifyEmail } from "@/lib/mail";
import { getPasswordResetTokenByToken } from "@/data/tokens";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"

export const requestResetPassword = async (values: z.infer<typeof RequestResetSchema>) => {
    const checkedFields = RequestResetSchema.safeParse(values);
    if(!checkedFields.success) return { type: "error", message: "Invalid fields" } as formFlashProps;

    const { email } = checkedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser) return { type: "error", message: "User not found" } as formFlashProps;

    if(!existingUser?.emailVerified){
        const emailResponse = await verifyEmail(existingUser?.email, existingUser?.name as string);
        if(!!emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;

        return { type: 'warning', message: "Looks like you haven't confirmed your email. Check your mail." } as formFlashProps;
    }

    const emailResponse = await initPassReset(existingUser?.email, existingUser?.name as string)
    if(emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;

    return { type: "success", message: "Reset Email Sent!" } as formFlashProps;
}

export const changePassword = async (values: z.infer<typeof PasswordResetSchema>, token: string) => {
    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken) return { type: "error", message: "Invalid Token" } as formFlashProps;
    
    const hasExpired = new Date() > new Date(existingToken?.expires);
    if(hasExpired) return { type: "error", message: "Expired Token" } as formFlashProps;

    const existingUser = await getUserByEmail(existingToken?.email);
    if(!existingUser) return { type: "error", message: "User not found" } as formFlashProps;

    if(!existingUser?.emailVerified){
        const emailResponse = await verifyEmail(existingUser?.email, existingUser?.name as string);
        if(!!emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;

        return { type: 'warning', message: "Looks like you haven't confirmed your email. Check your mail." } as formFlashProps;
    }
    
    const checkedFields = PasswordResetSchema.safeParse(values);
    if(!checkedFields.success) return { type: "error", message: "Invalid fields" } as formFlashProps;

    const { password } = checkedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({ where: { id: existingToken.id } });

    return { type: "success", message: "Successfully reset password!" } as formFlashProps;
}
