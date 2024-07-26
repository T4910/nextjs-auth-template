import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddUser() {
    return (
        <Button className="space-x-1">
            <Plus />
            <p className="sr-only md:not-sr-only">Add users</p>
        </Button>
    )
}