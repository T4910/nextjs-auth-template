"use server"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { formFlashProps } from "@/components/auth/formFlash"
import { getVerificationTokenByToken } from "@/data/tokens"
import { AuthError } from "next-auth";
import { signIn } from "@/middleware/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware/route"

type newVerificationReturn = ((token: string) => formFlashProps) | Promise<formFlashProps>;

export const newVerification = async (token: string) => {    
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken) return { type: "error", message: "Invalid Token" } as formFlashProps;

    const hasExpired = new Date() > new Date(existingToken?.expires);
    if(hasExpired) return { type: "error", message: "Expired Token" } as formFlashProps;

    const user = await getUserByEmail(existingToken?.email);
    if(!user) return { type: "error", message: "User not found" } as formFlashProps;

    await db.user.update({
        where: { id: user.id },
        data: { 
            email: existingToken.email,
            emailVerified: new Date() 
        }
    });

    await db.verificationToken.delete({ where: { id: existingToken.id } });

    try {
        await signIn("credentials", { 
            email: user.email,  
            password: user.password,
            directAccess: true,
            redirectTo: DEFAULT_LOGIN_REDIRECT 
        });

        return { type: 'success', message: "Logging in now..."} as formFlashProps;
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                /**
                 * CredentialsSignin was originally supposed to be the error type, but due to 
                 * nature of nextauth, an error that occurs in the authorize callback can bring
                 * about a CallbackRouteError and a situation where the credentials do not match
                 * causes an error in the authorize callback.
                 * Check this links for better understanding: 
                 * https://authjs.dev/reference/core/errors#credentialssignin 
                 * https://authjs.dev/reference/core/errors#callbackrouteerror
                 * 
                 * This is a temporary fix until a better solution is found.
                 */
                case "CallbackRouteError": 
                    return { type: 'error', message: "Invalid credentials!"} as formFlashProps;
                case "CredentialsSignin":
                    return { type: 'error', message: "Invalid credentials!"} as formFlashProps;
                default:
                    return { type: 'error', message: "Something went  wrong!"} as formFlashProps;
            }
        }

        throw error;
    }

    return { type: "success", message: "Email has been verified. Logging in now" } as formFlashProps;
    
}