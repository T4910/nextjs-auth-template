import { auth } from "@/middleware/auth"

export const getCurrentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const getRole = async () => {
    const session = await auth();

    return session?.user?.role;
}