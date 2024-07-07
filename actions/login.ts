"use server"
import * as z from "zod";
import { LoginSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import { signIn } from "@/middleware/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/user";
import { verifyEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const checkedFields = LoginSchema.safeParse(values);

    if(!checkedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { email, password } = checkedFields.data as typeof values;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser?.email || !existingUser?.password){
        return { type: "error", message: "Email does not exist!"};
    }

    const passwordMatch = await bcrypt.compare(password, existingUser?.password as string);
    if(!passwordMatch) return { type: 'error', message: "Invalid credentials" } as formFlashProps;

    if(!existingUser?.emailVerified){
        const emailResponse = await verifyEmail(email, existingUser?.name as string);
        if(!!emailResponse.error || !emailResponse.res?.includes('OK')) return { type: 'error', message: "Server Error" } as formFlashProps;
            

        return { type: 'warning', message: "Looks like you haven't confirmed your email. Check your mail." } as formFlashProps;
    }

    try {
        await signIn("credentials", { email, password,
            redirectTo: DEFAULT_LOGIN_REDIRECT 
        })
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

    return { type: 'success', message: "Valid fields"} as formFlashProps;
}