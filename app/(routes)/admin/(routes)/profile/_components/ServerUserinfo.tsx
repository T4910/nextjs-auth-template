import { 
    Card, CardHeader,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { AdminServerAction } from "@/app/(routes)/admin/(routes)/profile/_components/ServerAction";
 
export async function ServerUserInfo() {
    const user = await getCurrentUser();
    
    const details = { 
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    };
    
    return (
        <Card className="container shadow-md px-0 max-w-fit pb-4">
            <CardHeader className="items-center">
                <h3 className="font-semibold">Server Component</h3>
            </CardHeader>
            <CardContent className="flex flex-col justify-between items-center space-y-4 px-4 py-2">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm min-w-full space-x-6">
                    <p className={cn(
                      "text-sm font-medium capitalize",
                      key === "id" && "uppercase"
                    )}>{key}</p>
                    <p className="text-xs truncate font-mono p-1 max-w-min bg-slate-100 rounded-md">{value}</p>
                </div>
              ))}
              <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm min-w-full space-x-6">
                  <p className="text-sm font-medium">Two Factor Authentication</p>
                  <Badge
                    variant={user?.is2fEnabled ? "success" : "destructive"}
                  >
                    {user?.is2fEnabled ? "ON" : "OFF"}
                  </Badge>
              </div>
              <AdminServerAction />
            </CardContent>
        </Card>
    )
}