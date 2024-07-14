import { db } from "@/lib/db";

export const getEmailVerificationTokenByEmail = async (email: string) => {
    try {
        const emailVerificationToken = await db.emailVerificationToken.findFirst({ where: { email } });
        return emailVerificationToken;
    } catch (error) {
        return null;
    }
};

export const getEmailVerificationTokenByToken = async (token: string) => {
    try {
        const emailVerificationToken = await db.emailVerificationToken.findUnique({ where: { token } });
        return emailVerificationToken;
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const emailVerificationToken = await db.passwordResetToken.findFirst({ where: { email } });
        return emailVerificationToken;
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const emailVerificationToken = await db.passwordResetToken.findUnique({ where: { token } });
        return emailVerificationToken;
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
