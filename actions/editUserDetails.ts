"use server"
import { z } from "zod";
import { db } from "@/lib/db";
import { banUsersById, deleteUsersById, getUserByEmail, getUserById, getUserByName, unbanUsersById } from "@/data/user";
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
    dirtyFields: Record<string, boolean>,
    admin?: boolean
) => {
    console.log('Editting someone')
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
        
        if(!admin){
            const emailResponse = await verifyEmail(edittedValues?.email as string, user?.name as string);
            if(emailResponse.error) return { type: "error", message: "Error sending confirmation email" } as formFlashProps;
            
            edittedValues.email = undefined;
            sentEmail = true;
    
            // return { type: "success", message: "Confirmation email sent!" } as formFlashProps;
        }

    }
    
    await db.user.update({
        where: { id: userId },
        data: {...edittedValues}
    })

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    if(sentEmail) return { type: "success", message: "Confirmation email sent! Changed other details" } as formFlashProps;
    return { type: "success", message: "Successfully Changed Details" } as formFlashProps;
}

export const getUserInfo = async (id: string) => {
    const user = getUserById(id);
    return user;
}

export const deleteUsers = async (ids: string[]) => {
    // validate 
    const users = await db.user.findMany({
        where: {
            id: {
                in: ids
            }
        },
        select: { id: true }
    });
    
    // delete
    const idsToDelete = users.map(obj => obj.id);
    const res = await deleteUsersById(idsToDelete);

    revalidatePath("/admin");

    if(res) return { type: "success", message: "Deleted Users Successfully" }
    else return { type: "error", message: "Failed to delete users" }
}

export const banUsers = async (ids: string[]) => {
    // validate 
    const users = await db.user.findMany({
        where: {
            id: {
                in: ids
            }
        },
        select: { id: true }
    });
    
    // ban
    const idsToBan = users.map(obj => obj.id);
    const res = await banUsersById(idsToBan);

    revalidatePath("/admin");
    revalidatePath("/dashboard");

    if(res) return { type: "success", message: "Banned Users Successfully" }
    else return { type: "error", message: "Failed to ban users" }
}

export const unbanUsers = async (ids: string[]) => {
    // validate 
    const users = await db.user.findMany({
        where: {
            id: {
                in: ids
            }
        },
        select: { id: true }
    });
    
    // ban
    const idsToUnban = users.map(obj => obj.id);
    const res = await unbanUsersById(idsToUnban);

    revalidatePath("/admin");

    if(res) return { type: "success", message: "Banned Users Successfully" }
    else return { type: "error", message: "Failed to ban users" }
}

