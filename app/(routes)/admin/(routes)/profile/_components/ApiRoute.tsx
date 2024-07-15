import { Button } from "@/components/ui/button";
import { toast } from "sonner"

export function AdminApiRoute() {
    const onApiRouteClick = () => {
        fetch("/api/admin")
        .then(res => {
            if(res.ok){
                toast.success("Admin!!!!!");
            } else {
                toast.error("Forbidden");
            }
        })
    }

    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md space-x-4">
            <p className="text-sm font-medium">
                Admin-only API Route
            </p>
            <Button 
                size="sm"
                onClick={onApiRouteClick} 
            >
                Click to test
            </Button>
        </div>
    )
}