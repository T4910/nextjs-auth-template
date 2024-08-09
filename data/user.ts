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
			omit: {
				password: true,
				updatedAt: true,
			}
		});
		return users;
		
	} catch (error) {
		return null;
	}
};

export const banUsersById = async (ids: string[]) => {
	try {
		const users = await db.user.updateMany({
			where: {
				id: { in: ids },
				ban: false,
				role: { // admins can not be banned - remove if you need to
					not: "ADMIN" 
				}
			},
			data: {
				ban: true
			}
		});
		
		return users;
	} catch (error) {
		return null;
	}
};

export const unbanUsersById = async (ids: string[]) => {
	try {
		const users = await db.user.updateMany({
			where: {
				id: { in: ids },
				ban: true
			},
			data: {
				ban: false
			}
		});
		
		return users;
	} catch (error) {
		return null;
	}
};

export const deleteUsersById = async (ids: string[]) => {
	try {
    	// await db.$queryRaw`DELETE FROM table WHERE id IN ${ids};`
		const user = await db.user.deleteMany({
			where: {
				id: {
					in: ids
				}
			}
		});
	
		return user;
	} catch (error) {
		return null;
	}
};