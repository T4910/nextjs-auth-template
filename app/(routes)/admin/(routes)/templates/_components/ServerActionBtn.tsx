"use client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import React, { useActionState, useState } from "react"
import { admin } from "@/actions/admin"

export function ServerActionBtn() {
    const onClick = () => {
        admin()
        .then(data => {
            if(data?.type === "error") {
                toast.error(data?.message);
            }
        
            if(data?.type === "success") {
                toast.success(data?.message);
            }

        })
    }


    return (
        <Button
            size="sm" 
            onClick={onClick}
        >
            Click to test
        </Button>
    )
}