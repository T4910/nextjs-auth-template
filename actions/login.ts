"use server"
import * as z from "zod";
import { LoginSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"
import { signIn } from "@/middleware/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware/route";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const checkedFields = LoginSchema.safeParse(values);

    if(!checkedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    const { email, password } = checkedFields.data as typeof values;

    try {
        await signIn("credentials", { email, password,
            redirectTo: DEFAULT_LOGIN_REDIRECT 
        })
    } catch (error) {
        if(error instanceof AuthError){
            console.log(error.type, 778)
            switch(error.type){
                case "CallbackRouteError":
                    return { type: 'error', message: "Invalid credentials!"} as formFlashProps;
                case "CredentialsSignin": //! it is seeing CallbackRouteError instead of CredentialsSignin
                    return { type: 'error', message: "Invalid credentials!"} as formFlashProps;
                default:
                    return { type: 'error', message: "Something went  wrong!"} as formFlashProps;
            }
        }

        throw error;
    }

    return { type: 'success', message: "Valid fields"} as formFlashProps;
}