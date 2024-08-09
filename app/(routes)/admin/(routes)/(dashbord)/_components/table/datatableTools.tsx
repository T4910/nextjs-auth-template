import { AddUserButton } from "./addUser";
import { ColumnFilter } from "./columnFilter";
import { MultipleSelectAction } from "./multipleSelectAction";
import { SearchBox } from "./searchBox";
import { reactTableType } from "./usersTable";

type datatableToolsProps = {
    table: reactTableType
}

export function DatatableTools({ table }: datatableToolsProps) {
    return (
        <div className="flex items-center py-4 gap-2">
            <SearchBox table={table}/> 
            <ColumnFilter table={table} />
            <AddUserButton />
            {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && <MultipleSelectAction table={table}/>}
        </div>  
    )
}