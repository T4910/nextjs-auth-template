import { ServerActionBtn } from "./ServerActionBtn";

export function AdminServerAction() {
    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md space-x-4">
            <p className="text-sm font-medium">
                Admin-only Server Action
            </p>
            <ServerActionBtn />
        </div>
    )
}