import { db } from "@/lib/db"
import { Cards } from "./cards"
import { UsersTable } from "./table/usersTable"

export async function Dashboard() {
    const users = await db.user.findMany({ take: 10 });

    return (
        <div className="grid">
            <Cards />
            <UsersTable users={users}/>
        </div>
    )
}