import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { type User } from "@prisma/client";


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

export const getUsers = async(params: Prisma.UserFindManyArgs<User>) => {
	try {
		const users = await db.user.findMany(params);
		return users;
		
	} catch (error) {
		return null;
	}
};