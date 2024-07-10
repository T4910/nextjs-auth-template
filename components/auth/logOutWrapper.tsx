"use client"
import { ReactNode } from "react"
import { signOut } from "next-auth/react";

type showloginWrapperProps = {
    children: ReactNode,
}

export function LogoutWrapper({ children }: showloginWrapperProps) {
    const logOut = () => signOut();

    return (
        <span onClick={logOut} className="cursor-pointer">
            {children}
        </span>
    );
}