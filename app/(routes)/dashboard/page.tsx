import { CardWrapper } from "@/components/cardWrapper";
import { getCurrentUser } from "@/lib/auth"
import { Navbar } from "@/app/(routes)/dashboard/_components/Navbar";
import { UserInfo } from "./_components/Userinfo";

export default async function page() {
  const user = await getCurrentUser();

  return (
    <div className="grid place-items-center min-h-screen bg-radial-gradient">
      <div className="space-y-6">
        <Navbar name={user?.name || ""}/>
        {user && <UserInfo user={user} />}
      </div>
    </div>
  )
}






{/* <form action={async () => {
  "use server"

  await signOut({
    redirectTo: "/"
  });
}}>
  <button type="submit">Sign out</button>
</form> */}