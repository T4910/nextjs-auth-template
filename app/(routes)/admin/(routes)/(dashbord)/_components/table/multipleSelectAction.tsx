import { Button } from "@/components/ui/button";
import { reactTableType } from "./usersTable";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { DeleteUserDialog, DMIbutton } from "./rowActions";
import { banUsers, unbanUsers } from "@/actions/editUserDetails";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


type MultipleSelectActionProps = {
    table: reactTableType
}

export function MultipleSelectAction({ table }: MultipleSelectActionProps) {
    return (
        <MultipleSelectActionWrapper table={table}>
            <Button
                variant="outline"
                className="outline-dashed" 
            >
                More action
                <ChevronDown className="size-4"/>
            </Button>
        </MultipleSelectActionWrapper>
    )
}


function MultipleSelectActionWrapper({children, table}: { children: ReactNode, table: reactTableType }) {
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
    const selectedIds = selectedRows.map(row => row.id);
    const isSelectedBanned = selectedRows.every(row => row.ban);
    const isSelectedUnBanned = selectedRows.every(row => row.ban === false);

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {isSelectedBanned && <UnbanUsers ids={selectedIds}/>}

                    {isSelectedUnBanned && <BanUsers ids={selectedIds}/>}

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DMIbutton className="bg-red-400 hover:bg-red-500 hover:text-accent-current mt-1" prevent>
                                Delete User
                            </DMIbutton>
                        </AlertDialogTrigger>
                        <DeleteUserDialog ids={selectedIds}/>
                    </AlertDialog>
                    
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteUserDialog ids={selectedIds}/>
        </AlertDialog>
    )
}

function BanUsers({ ids }: { ids: string[] }){
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DMIbutton  prevent>
                    Ban User
                </DMIbutton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will ban these
                    accounts.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => banUsers(ids)}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function UnbanUsers({ ids }: { ids: string[] }){
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DMIbutton  prevent>
                    Unban User
                </DMIbutton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will unban these
                    accounts.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => unbanUsers(ids)}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
