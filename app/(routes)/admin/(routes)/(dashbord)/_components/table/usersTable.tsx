"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import moment from 'moment';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type Table as tTable } from "@tanstack/react-table";
import { SearchBox } from "./searchBox"
import { ColumnFilter } from "./columnFilter"
import { Pagination } from "./pagination"
import { DataTable } from "./datatable"
import { AddUser } from "./addUser"
import { DatatableTools } from "./datatableTools"
import { type User } from "@prisma/client"
import { RowActions } from "./rowActions";


// export const data = [
//   {
//     id: "m5gr84i9",
//     name: "hello",
//     email: "ken99@yahoo.com",
//     role: "success",
//     creationDate: "2021-09-01T00:00:00Z", // input length stayed on platform
//     status: 'active',
//   },
//   {
//     id: "3u1reuv4",
//     name: "hello",
//     email: "Abe45@gmail.com",
//     role: "success",
//     creationDate: "2021-09-01T00:00:00Z",
//     status: 'active',
//   },
// ]

export type UserData = {
  id: string
  name: string
  email: string
  role: string
  status?: "active" | "offline" | "banned"
  createdAt: string
}

export type reactTableType = tTable<UserData>

export const columns: ColumnDef<UserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },  
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4 invisible" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const numberOfDays = calculateDaysDifference(new Date(row.getValue("createdAt")));
      const dateJoined = formatDate(new Date(row.getValue("createdAt")));

      return (
        <div className="text-right">
          <p>{dateJoined}</p>
          <span className="text-xs text-gray-500">
            Created {numberOfDays} days ago
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <RowActions rowInfo={row.original}/>
      )
    },
  },
]

type UsersTableProps = { users: UserData[] | null }

export function UsersTable({ users: data }: UsersTableProps ) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
      data: data ?? [],
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })

    return (
      <div className="w-full bg-white rounded-md px-4">
        <DatatableTools table={table}/>
        <DataTable table={table}/>
        <Pagination table={table} />
      </div>
    )
}

function formatDate(date: Date){
    const dateJoined = moment(date).format('DD/MM/YYYY');

    return dateJoined;
}

function calculateDaysDifference(targetDateTime: Date) {
  // Get the current date and time using moment
  const now = moment();

  // Parse the target datetime value using moment
  const targetDate = moment(targetDateTime);

  // Calculate the difference in days between the two dates
  const differenceInDays = now.diff(targetDate, 'days');

  return differenceInDays;
}
