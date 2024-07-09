import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail, getPasswordResetTokenByEmail } from "@/data/tokens";

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(new Date().getTime() + 3600 * 5000); // 5 minutes
    
        const existingToken = await getVerificationTokenByEmail(email);
                
        const verificationToken = await db.verificationToken.upsert({
            where: { token: existingToken?.token ?? '' },
            update: { token, expires },
            create: { email, token, expires }
        });
    
        return verificationToken;
    } catch (error) {
        return null;
    }
};

export const generatePasswordResetToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(new Date().getTime() + 3600 * 5000); // 5 minutes
    
        const existingToken = await getPasswordResetTokenByEmail(email);
                
        const verificationToken = await db.passwordResetToken.upsert({
            where: { token: existingToken?.token ?? '' },
            update: { token, expires },
            create: { email, token, expires }
        });
    
        return verificationToken;
    } catch (error) {
        return null;
    }
};