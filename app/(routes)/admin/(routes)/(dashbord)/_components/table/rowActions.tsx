"use client"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"    
// import { Dialog } from "@/components/ui/dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { banUsers, deleteUsers, getUserInfo, unbanUsers } from "@/actions/editUserDetails"
import { type UserData } from "./usersTable"
import { EditDetailsTrigger } from "@/app/(routes)/dashboard/_components/EditDetails"
import { EditPasswordTrigger } from "@/app/(routes)/dashboard/_components/EditPassword"

type RowActionsProps = {
    rowInfo: UserData
    setMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

export function RowActions({ rowInfo }: RowActionsProps) {
    const [ openMenu, setOpenMenu ] = React.useState(false);

    return (
        <>
            <DropdownMenu 
                // defaultOpen={rowInfo.id === "clxtfrtbc0000v07obd81clpe" && true}
                open={openMenu}
                onOpenChange={(open) => setOpenMenu(open)}
                modal={false}
            >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-30">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <CopyID id={rowInfo?.id}/>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>View More Details</DropdownMenuItem>
                    <EditUserDetails rowInfo={rowInfo} setMenu={setOpenMenu}/>
                    <ChangeUserPassword rowInfo={rowInfo} setMenu={setOpenMenu}/>

                    <DropdownMenuSeparator />

                    <AlertDialog onOpenChange={(open) => setOpenMenu(open)}>
                        <AlertDialogTrigger asChild>
                            <DMIbutton prevent>
                                {rowInfo?.ban ? "Unban User" : "Ban User"}
                            </DMIbutton>
                        </AlertDialogTrigger>
                        <BanUserDialog id={rowInfo?.id} isBanned={rowInfo?.ban}/>
                    </AlertDialog>

                    <AlertDialog onOpenChange={(open) => setOpenMenu(open)}>
                        <AlertDialogTrigger asChild>
                            <DMIbutton className="bg-red-400 hover:bg-red-500 hover:text-accent-current mt-1" prevent>
                                Delete User
                            </DMIbutton>
                        </AlertDialogTrigger>
                        <DeleteUserDialog ids={[rowInfo?.id]}/>
                    </AlertDialog>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

// DropdownMenuItemButton - FIX IT (fowardRef error)
export const DMIbutton = React.forwardRef<HTMLButtonElement, ButtonProps & { prevent?: boolean }>(
    ({ className, variant = "ghost", prevent, ...props }, ref) => {
        return (
            <DropdownMenuItem className="p-0" onSelect={(e) => prevent && e.preventDefault()}>
                <Button
                    ref={ref}
                    variant={variant}
                    className={cn(
                        "w-full px-2 py-1.5 font-normal text-sm justify-start h-fit", 
                        className
                    )}
                    {...props}
                />
            </DropdownMenuItem>
        );
    }
);


function CopyID({ id }: { id: string }){
    return (
        <DMIbutton
            onClick={() => navigator.clipboard.writeText(id)}
        >
            Copy User ID
        </DMIbutton>
    )
}

export function DeleteUserDialog({ ids }: { ids: string[] }){
    return (
        <>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteUsers(ids)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}

function BanUserDialog({ id, isBanned }: { id: string, isBanned: boolean }){
    return (
        <>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will {isBanned ? "unban" : "ban"} this
                    account.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => isBanned ? unbanUsers([id]) : banUsers([id])}
                >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}


function EditUserDetails({ rowInfo: user, setMenu }: RowActionsProps){
    const EditDetailsAdminInfo = {
        isAdmin: true,
        callbacks: {
            setMenu
        }
    }

    return (
        <EditDetailsTrigger user={user} editDetailsAdminInfo={EditDetailsAdminInfo}>
            <DMIbutton prevent>
                Edit User Details
            </DMIbutton>
        </EditDetailsTrigger>    
    )
}

function ChangeUserPassword({ rowInfo: user, setMenu }: RowActionsProps){
    const ChangePasswordAdminInfo = {
        isAdmin: true,
        userDetails: user,
        callbacks: {
            setMenu
        }
    }

    return (
        <EditPasswordTrigger changePasswordAdminInfo={ChangePasswordAdminInfo}>
            <DMIbutton prevent>
                Change User Password
            </DMIbutton>
        </EditPasswordTrigger>    
    )
}