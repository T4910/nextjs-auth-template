import { db } from "@/lib/db";

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

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.passwordResetToken.findFirst({ where: { email } });
        return verificationToken;
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.passwordResetToken.findUnique({ where: { token } });
        return verificationToken;
    } catch (error) {
        return null;
    }
};

export const get2FTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({ where: { email } });
        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const get2FTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } });
        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const get2FConfirmatonByUserId = async (userId: string) => {
    try {
        const confirmation = await db.twoFactorConfirmation.findUnique({ where: { userId } })
        return confirmation;
    } catch (error) {
        return null;
    }
}
