import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export function RowActions({ rowInfo }: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <CopyID id={rowInfo?.id}/>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View More Details</DropdownMenuItem>
                <DropdownMenuItem>Edit User Details</DropdownMenuItem> { /* edit password here too */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ban User</DropdownMenuItem>
                <DropdownMenuItem>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function CopyID({ id }: { id: string }){
    return (
        <Button
            variant="ghost"
            className="w-full px-2 py-1.5 font-normal text-sm text-left"
            onClick={() => navigator.clipboard.writeText(id)}
        >
            Copy User ID
        </Button>
    )
}