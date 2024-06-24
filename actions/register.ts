"use server"
import * as z from "zod";
import { RegisterSchema } from "@/middleware/schema";
import { type formFlashProps } from "@/components/auth/formFlash"


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields) return { type: 'error', message: "Invalid fields!"} as formFlashProps;

    console.log(values);

    return { type: 'success', message: "Valid fields"} as formFlashProps;
}