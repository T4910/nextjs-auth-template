"use server"
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByName } from "@/data/user";
import { type formFlashProps } from "@/components/auth/formFlash";
import { EditUserDetailsSchema } from "@/middleware/schema";
import { revalidatePath } from "next/cache";
import { filterObjectByKeys } from "@/lib/utils";
import { verifyEmail } from "@/lib/mail";
import { getCurrentUser } from "@/lib/auth"; 
// from "react-hook-form"

export const editUserDetails = async (
    values: z.infer<typeof EditUserDetailsSchema>, 
    userId: string, 
    dirtyFields: Record<string, boolean>
) => {
    let sentEmail;
    const user = await getCurrentUser();
    const checkedFields = EditUserDetailsSchema.safeParse(values);
    if(!checkedFields.success) return { type: "error", message: "Invalid fields" } as formFlashProps;
    
    const edittedValues = filterObjectByKeys(dirtyFields, checkedFields.data);

    if(edittedValues?.name){
        const existingName = await getUserByName(edittedValues?.name as string);
        if(existingName) return { type: "error", message: "Username already in use" } as formFlashProps;
    }

    if(edittedValues?.email){
        const existingEmail = await getUserByEmail(edittedValues?.email as string);
        if(existingEmail) return { type: "error", message: "Email already in use" } as formFlashProps;
        
        // TODO: email verification
        const emailResponse = await verifyEmail(edittedValues?.email as string, user?.name as string);
        if(emailResponse.error) return { type: "error", message: "Error sending confirmation email" } as formFlashProps;
        
        edittedValues.email = undefined;
        sentEmail = true;

        // return { type: "success", message: "Confirmation email sent!" } as formFlashProps;
    }
    
    await db.user.update({
        where: { id: userId },
        data: {...edittedValues}
    })

    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard");

    if(sentEmail) return { type: "success", message: "Confirmation email sent! Changed other details" } as formFlashProps;
    return { type: "success", message: "Successfully Changed Details" } as formFlashProps;
}