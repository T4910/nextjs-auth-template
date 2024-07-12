import { LogoutWrapper } from "@/components/auth/logOutWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EditPasswordTrigger } from "@/app/(routes)/dashboard/_components/EditPassword"
import { EditDetailsTrigger } from "@/app/(routes)/dashboard/_components/EditDetails"

type NavbarProps = {
    name: string,
    image?: string
}

export function Navbar({ user }) {
  return (
    <Card className="container shadow-md px-0 max-w-fit">
        <CardContent className="flex justify-between items-center space-x-6 px-4 py-2 flex-wrap">
            <h1 className="text-xl font-medium">Welcome, {user?.name}</h1>
            <div className="flex justify-between items-center space-x-2">
                <EditDetailsTrigger user={user}>
                    <Button 
                        className="font-normal p-3 py-0.5"
                        size="sm"
                        variant="outline" 
                    >Edit profile</Button>
                </EditDetailsTrigger>
                <EditPasswordTrigger>
                    <Button 
                        className="font-normal p-3 py-0.5"
                        size="sm"
                        variant="outline" 
                    >Change password</Button>
                </EditPasswordTrigger>
                <LogoutWrapper>
                    <Button 
                        className="font-normal p-3 py-0.5"
                        size="sm" 
                    >Sign Out</Button>
                </LogoutWrapper>
            </div>
        </CardContent>
    </Card>
  )
}