import bcyrpt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/middleware/schema";
import { getUserByEmail, getUserByName } from "@/lib/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                if(credentials.directAccess){
                    if(!credentials.email && !credentials.password) return null;

                    const user = await getUserByEmail(credentials?.email as string) || await getUserByName(credentials?.email as string); // if a username is passed in the `email` field
                    if(!user || !user.password) return null;
                    
                    return user;
                }

                const checkedFields = LoginSchema.safeParse(credentials);
                if(!checkedFields.success) return null;
                    
                const { email, password } = checkedFields.data;
                
                const user = await getUserByEmail(email) || await getUserByName(email); // if a username is passed in the `email` field
                if(!user || !user.password) return null;
                
                const passwordMatch = await bcyrpt.compare(password, user?.password as string);
                if(passwordMatch) return user;

                return null;
            }
        })
    ]
};
