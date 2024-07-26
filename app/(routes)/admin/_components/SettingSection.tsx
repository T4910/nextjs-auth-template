import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ReactNode } from "react"
  
type SettingSectionProps = {
    heading: string
    children: ReactNode
}

export default function SettingSection({ heading, children }: SettingSectionProps) {
  return (
    <div className="mb-2">
        <h3 className="font-semibold text-xl py-1">{heading}</h3>
        <Separator />
        <div className="py-4 px-0.5">{children}</div>
    </div>
  )
}