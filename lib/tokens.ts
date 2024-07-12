import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { generateOTP } from "@/lib/utils";
import { getUserByEmail } from "@/data/user";
import { 
    getVerificationTokenByEmail, 
    getPasswordResetTokenByEmail, 
    get2FTokenByEmail 
} from "@/data/tokens";

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(new Date().getTime() + 1000*60*( 30 )); // 5 minutes
    
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

export const generate2FToken = async (email: string) => {
    try {
        const token = generateOTP();
        const expires = new Date(new Date().getTime() + 1000*60*( 10 )); // 10 minutes
    
        const existingToken = await get2FTokenByEmail(email);
        const existingUser = await getUserByEmail(email);

        if(!existingUser) return null;
                
        const twoFactorToken = db.twoFactorToken.upsert({
            where: { token: existingToken?.token ?? '' },
            update: { token, expires },
            create: { email, token, expires }
        });
    
        return twoFactorToken;
    } catch (error) {
        return null;
    }
};

export const generatePasswordResetToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(new Date().getTime() + 1000*60*( 5 )); // 5 minutes
    
        const existingToken = await getPasswordResetTokenByEmail(email);
                
        const passwordResetToken = await db.passwordResetToken.upsert({
            where: { token: existingToken?.token ?? '' },
            update: { token, expires },
            create: { email, token, expires }
        });
    
        return passwordResetToken;
    } catch (error) {
        return null;
    }
};