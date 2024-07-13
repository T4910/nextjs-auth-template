"use client"

import { useCurrentRole } from "@/hooks/sessions"
import { Roles } from "@prisma/client"
import { ReactNode } from "react"
import Flash from "@/components/auth/formFlash"

type RoleGateProps = {
    children: ReactNode,
    allowedRole: Roles
} 

export function RoleGate({ children, allowedRole }: RoleGateProps) {
    const role = useCurrentRole();

    if(role !== allowedRole) return (
        <Flash 
            type="error"
            message="You are not allowed to view this"
        />
    );

    return (
        <>
            {children}
        </>
    );
}
