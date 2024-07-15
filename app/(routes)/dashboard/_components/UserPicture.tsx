import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { getCurrentUser } from "@/lib/auth"
import { FaUser } from "react-icons/fa"
import { type ClassValue, clsx } from "clsx"
import { cn } from "@/lib/utils"

type UserPictureProps = { 
    AvaterClassName?: ClassValue, 
    IconClassName?: ClassValue 
}

export async function UserPicture({ AvaterClassName, IconClassName }: UserPictureProps) {
    const user = await getCurrentUser()

    return (
        <Avatar className={cn(
            "size-20",
            AvaterClassName
        )}>            
            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ""} />
            <AvatarFallback>
                <FaUser className={cn(
                    "size-8",
                    IconClassName
                )} />
            </AvatarFallback>
        </Avatar>
    )
}