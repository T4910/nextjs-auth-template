import { AddUser } from "./addUser";
import { ColumnFilter } from "./columnFilter";
import { SearchBox } from "./searchBox";
import { reactTableType } from "./usersTable";

type datatableToolsProps = {
    table: reactTableType
}

export function DatatableTools({ table }: datatableToolsProps) {
    return (
        <div className="flex items-center py-4 gap-2">
            {/*  typescript error is being caused by the array being returned by tTable - create a new schema for the data and insert it where `typeof data` is */}
            <SearchBox table={table}/> 
            <ColumnFilter table={table} />
            <AddUser />
        </div>  
    )
}