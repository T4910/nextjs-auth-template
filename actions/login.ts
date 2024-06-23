"use server"
import * as z from "zod";
import { LoginSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    console.log(values);

    return { type: 'success', message: "Valid fields"} as formFlashProps;
}