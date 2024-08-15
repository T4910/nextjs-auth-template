import { Button } from "@/components/ui/button";
import { EditDetailsTrigger } from "../../dashboard/_components/EditDetails";
import { getCurrentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { EditPasswordTrigger } from "../../dashboard/_components/EditPassword";
import BackButton from "./backButton";

export default async function Functions({ id }: { id?: string }) {
  const sessionUser = await getCurrentUser()
  const user = await getUserById(!!id ? id : sessionUser?.id ?? ''); //

  return (
    <div className="w-full py-4 flex justify-between items-center">
      <BackButton />
      {(user && (sessionUser?.role === "ADMIN" || user?.id === sessionUser?.id)) && (
        <div className="space-x-2">
          <EditDetailsTrigger 
            user={user}
            editDetailsAdminInfo={{ isAdmin: user.role === 'ADMIN' }}
          >
              <Button 
                  className="font-normal p-3 py-0.5"
                  size="sm"
                  variant="outline" 
              >Edit profile</Button>
          </EditDetailsTrigger>
          <EditPasswordTrigger changePasswordAdminInfo={{
            isAdmin: user?.role === 'ADMIN',
            userDetails: user
          }}>
              <Button 
                  className="font-normal p-3 py-0.5"
                  size="sm"
                  variant="outline" 
              >Change Password</Button>
          </EditPasswordTrigger>
        </div>
       )
      }
    </div>
  )
}