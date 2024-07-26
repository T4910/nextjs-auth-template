import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { reactTableType } from "./usersTable"
import { CheckIcon, PlusCircle} from "lucide-react"

type statusFilterProps = {
    table: reactTableType
}

// export const statuses = [
//     {
//       value: "backlog",
//       label: "Backlog",
//       icon: QuestionMarkCircledIcon,
//     },
    // {
    //   value: "todo",
    //   label: "Todo",
    //   icon: CircleIcon,
    // },
//     {
//       value: "in progress",
//       label: "In Progress",
//       icon: StopwatchIcon,
//     },
//     {
//       value: "done",
//       label: "Done",
//       icon: CheckCircledIcon,
//     },
//     {
//       value: "canceled",
//       label: "Canceled",
//       icon: CrossCircledIcon,
//     },
//   ]

export function statusFilter({ table }: statusFilterProps) {
  return (
    <>
        {table.getColumn("status") && (
            <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={[{
                    value: "todo",
                    label: "Todo",
                    icon: PlusCircle,
                }]}
            />
        )}
    </>
  )
}