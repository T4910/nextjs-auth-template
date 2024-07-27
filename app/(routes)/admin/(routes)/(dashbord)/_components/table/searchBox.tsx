"use client"
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { reactTableType } from "./usersTable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useState } from "react";

type searchBoxProps = {
    table: reactTableType
}

export function SearchBox({ table }: searchBoxProps) {
    const [searchAttr, setSearchAttr] = useState("email");
    // const [inputFieldVal, setInputFieldVal] = useState()

    return (
        <>
            <Input
                placeholder={`Search ${(searchAttr === "name" ? 'username' : searchAttr)}s...`}
                className="max-w-sm"
                autoComplete="off"
                value={(table?.getColumn(searchAttr)?.getFilterValue() as string) ?? ""}
                onChange={event => {
                  table.getColumn(searchAttr)?.setFilterValue(event.target.value)
                }}
            />
            <Select
              value={searchAttr}
              onValueChange={value => {
                table.resetColumnFilters() //  remove the filter on the table
                setSearchAttr(value)
              }}
            >
              <SelectTrigger className="h-8 w-fit">
                {/* <SelectValue placeholder={table.getState().pagination.pageSize} /> */}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='email'>
                    Email
                </SelectItem>
                <SelectItem value='name'>
                    Username
                </SelectItem>
              </SelectContent>
            </Select>
        </>
    )
}
