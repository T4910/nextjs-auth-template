import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReactNode } from "react"

type InfoCardProps = { 
    title: string
    amount: number
    footer: string
    icon: ReactNode 
}

export function InfoCard({ title, amount, footer, icon }: InfoCardProps) {
  return (
    <Card className="max-h-fit min-w-40 w-[23%] bg-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <>{icon}</>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">{footer}</p>
      </CardContent>
    </Card>
  )
}
