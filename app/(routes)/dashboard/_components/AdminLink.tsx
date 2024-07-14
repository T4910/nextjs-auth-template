import { RoleGate } from "@/components/auth/roleGate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminLink() {
    return (
        <RoleGate allowedRole="ADMIN">
            <Button 
                variant="outline"
                className="font-normal p-3 py-0.5"
                size="sm"
                asChild
            >
                <Link href="/admin">
                    Admin Dashboard
                </Link>
            </Button>
        </RoleGate>
    )
}