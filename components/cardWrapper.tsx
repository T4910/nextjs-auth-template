// "use client"
import React from "react"
import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Header } from "@/components/header"
import { OtherAuth } from "@/components/auth/otherAuth"
import { LinkButton } from "@/components/auth/linkButton"

type CardWrapperProps = {
    children: React.ReactNode,
    headerLabel: string,
    backBtnLabel: string,
    backBtnHref: string,
    showOtherAuth?: boolean
}

export function CardWrapper({
    children,
    headerLabel,
    backBtnLabel,
    backBtnHref,
    showOtherAuth
}: CardWrapperProps) {
  return (
    <Card className="container max-w-96 shadow-md px-2">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showOtherAuth && (
            <CardFooter>
                <OtherAuth />
            </CardFooter>
        )}
        <CardFooter>
            <LinkButton 
                label={backBtnLabel}
                href={backBtnHref}
            />
        </CardFooter>
    </Card> 
  )
}