"use server"
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/middleware/auth";
import { LoginSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { init2FAuth, verifyEmail } from "@/lib/mail";
import { 
    get2FTokenByEmail,
    get2FConfirmatonByUserId
} from "@/data/tokens";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const checkedFields = LoginSchema.safeParse(values);
    if(!checkedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { email, password, pin } = checkedFields.data as typeof values;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { type: "error", message: "Email does not exist!"};
    }

    const passwordMatch = await bcrypt.compare(password, existingUser?.password);
    if(!passwordMatch) return { type: 'error', message: "Invalid credentials" } as formFlashProps;

    if(!existingUser.emailVerified){
        const emailResponse = await verifyEmail(email, existingUser?.name as string);
        if(!!emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;
            
        return { type: 'warning', message: "Looks like you haven't confirmed your email. Check your mail." } as formFlashProps;
    }

    if(existingUser.is2fEnabled){
        if(!!pin){
            // prevents people for authentication with other logs
            const token = await get2FTokenByEmail(existingUser?.email); 

            // if token does not exist, pin incorrect or expires
            if(!token || token.token !== pin || new Date > new Date(token.expires)) return { type: 'error', message: "Invalid OTP" } as formFlashProps;

            await db.twoFactorToken.delete({ 
                where:  { id: token.id } 
            });

            const confirm = await get2FConfirmatonByUserId(existingUser?.id);
            if(!(!!confirm)) await db.twoFactorConfirmation.create({
                data: { userId: existingUser?.id }
            });
        } else {
            const emailResponse = await init2FAuth(email, existingUser?.name as string);
            if(!!emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;
    
            return { showOtp: true };
        }
    }

    
    try {
        await signIn("credentials", { email, password,
            redirectTo: DEFAULT_LOGIN_REDIRECT 
        });
    } catch (error) {
        console.log(error);
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

    // return { type: 'success', message: "Valid fields" } as formFlashProps;
}