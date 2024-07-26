import { db } from "@/lib/db";
import { type Prisma } from "@prisma/client";


export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserByName = async (name: string) => {
	try {
		const user = await db.user.findFirst({ where: { name } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
	}
};

export async function getUsersForAdmin(params: Prisma.UserFindManyArgs){
	try {
		const users = await db.user.findMany({
			...params, 
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
				// status: true,
			}
		});
		return users;
		
	} catch (error) {
		return null;
	}
};