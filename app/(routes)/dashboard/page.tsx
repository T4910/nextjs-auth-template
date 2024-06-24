import { auth, signOut } from "@/middleware/auth"

export default async function page() {
  const session = await auth();

  return (
    <div>
      <form action={async () => {
        "use server"

        await signOut({
          redirectTo: "/login"
        });
      }}>
        <button type="submit">Sign out</button>
      </form>
      {JSON.stringify(session)}
    </div>
  )
}