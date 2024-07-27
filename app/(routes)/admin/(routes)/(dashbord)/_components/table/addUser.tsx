import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddUser() {
    // tab for adding directly & for inviting
    return (
        <Button className="space-x-1">
            <Plus />
            <p className="sr-only md:not-sr-only">Add users</p>
        </Button>
    )
}