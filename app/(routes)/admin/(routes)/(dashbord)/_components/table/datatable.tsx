import { flexRender } from "@tanstack/react-table"
import { columns, reactTableType } from "./usersTable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DatatableHeader } from "./datatableHeader"


type DatatableProps = {
    table: reactTableType
}


export function DataTable({ table }: DatatableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <DatatableHeader table={table}/>
                <TableBody>
                    {!!table.getRowModel().rows?.length 
                        ? (table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) 
                        : <NoResults />
                    }
                </TableBody>
            </Table>
        </div>
    )
}

function NoResults() {
    return (
        <TableRow>
            <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
            >
                No results.
            </TableCell>
        </TableRow>
    )
}