"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { type ClassValue } from "clsx"
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
        <Link href={href} className="w-full">
            <Button 
                className={cn(
                    "flex py-2 px-6 pl-1 space-x-2.5 rounded-md justify-start w-full",
                    pathname === href && "outline-2"
                )}
                variant={(pathname === href) ? "outline" : "ghost"}
                // asChild
            >
                <>
                    <>{icon}</>
                    <div 
                        className={cn(
                            "text-base capitalize",
                            className
                        )}
                    >
                        {children}
                    </div>
                </>
            </Button>
        </Link>
    )
}