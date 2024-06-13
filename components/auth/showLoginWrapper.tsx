"use client"

import React from "react"
import { useRouter } from "next/navigation"

type showloginWrapperProps = {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export function ShowLoginWrapper({
    children,
    asChild,
    mode = "redirect"
}: showloginWrapperProps) {
    const router = useRouter();

    const sendToLogin = () => {
        router.push("/login");
    }

    if(mode === "modal") {
        return (
            <span>Add a modal of a login here...</span>
        );
    }

    return (
        <span onClick={sendToLogin} className="cursor-pointer">
            {children}
        </span>
    );
}