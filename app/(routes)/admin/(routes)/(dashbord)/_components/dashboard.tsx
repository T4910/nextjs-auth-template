import { Cards } from "./cards"
import { UsersTable } from "./table/usersTable"
import { getUsersForAdmin } from "@/data/user";

export async function Dashboard() {
    const users = await getUsersForAdmin({ take: 10 });

    return (
        <div className="grid space-y-4">
            <Cards />
            <UsersTable users={users}/>
        </div>
    )
}