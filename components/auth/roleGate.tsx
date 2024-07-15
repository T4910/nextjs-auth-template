"use client" // making it client so the it can workon bot client and server codes
import { useCurrentRole, useCurrentUser } from "@/hooks/sessions"
import { Roles } from "@prisma/client"
import { ReactNode } from "react"
import Flash from "@/components/auth/formFlash"

type RoleGateProps = {
    children: ReactNode,
    allowedRole: Roles,
    showError?: boolean
} 

// fix client error - slow down

export function RoleGate({ children, allowedRole, showError = false }: RoleGateProps) {
    const role = useCurrentRole();
    const user = useCurrentUser()
    console.log(role, user)

    if(role !== allowedRole){ 
        if(!showError) return null;

        return (
            <Flash 
                type="error"
                message="You are not allowed to view this"
            />
        );
    }

    return (
        <>
            {children}
        </>
    );
}
