"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { type ClassValue, clsx } from "clsx"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Navbtn = {
    children: ReactNode,
    href: string
    icon?: ReactNode
    className?: ClassValue
}

export function Navbtn({ children, icon, href, className }: Navbtn) {
    const pathname = usePathname();

    return (
        <Button 
            className={cn(
                "flex py-2 px-6 pl-1 space-x-2.5 rounded-md justify-start",
                pathname === href && ""
            )}
            variant={(pathname === href) ? "outline" : "ghost"}
            asChild
        >
            <div>
                {icon}
                <Link 
                    className={cn(
                        "text-base capitalize",
                        className
                    )}
                    href={href}
                    >
                    {children}
                </Link>
            </div>
        </Button>
    )
}