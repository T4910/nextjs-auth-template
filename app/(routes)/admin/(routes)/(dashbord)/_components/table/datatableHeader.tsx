import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { reactTableType } from "./usersTable"
import { flexRender } from "@tanstack/react-table"


type DatatableHeaderProps = {
    table: reactTableType
}

export function DatatableHeader({ table }: DatatableHeaderProps) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                )}
                            </TableHead>
                        )
                    })}
                </TableRow>
            ))}
        </TableHeader>
    )
}