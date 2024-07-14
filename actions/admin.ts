"use server"
import { Roles } from "@prisma/client";
import { getRole } from "@/lib/auth"

export const admin = async () => {
    const role = await getRole();

    if(role !== Roles.ADMIN) return { type: "error", message: "Forbidden!" };

    return { type: "success", message: "Successful!" };
}