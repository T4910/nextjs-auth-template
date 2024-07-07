import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(new Date().getTime() + 3600 * 5); // 5 minutes
    
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
export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({ where: { email } });
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.verificationToken.findUnique({ where: { token } });
		return verificationToken;
	} catch (error) {
		return null;
	}
};
