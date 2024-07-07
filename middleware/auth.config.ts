import bcyrpt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/middleware/schema";
import { getUserByEmail, getUserByName } from "@/lib/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                const checkedFields = LoginSchema.safeParse(credentials);
                if(!checkedFields.success) return null;

                const { email, password } = checkedFields.data;

                const user = await getUserByEmail(email) || await getUserByName(email); // if a username is passed in the `email` field
                if(!user || !user.password) null
                
                const passwordMatch = await bcyrpt.compare(password, user?.password as string);
                if(passwordMatch) return user;

                return null;
            }
        })
    ]
};
