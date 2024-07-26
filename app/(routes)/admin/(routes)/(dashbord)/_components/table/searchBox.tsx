import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { data, reactTableType } from "./usersTable";

type searchBoxProps = {
    table: reactTableType
}

export function SearchBox({ table }: searchBoxProps) {
    return (
        <Input
            placeholder="Filter emails..."
            className="max-w-sm"
            value={(table?.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={event => table.getColumn("email")?.setFilterValue(event.target.value)}
        />
    )
}
