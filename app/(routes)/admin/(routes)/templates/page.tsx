import { ServerUserInfo } from "./_components/ServerUserinfo"
import { ClientUserInfo } from "./_components/ClientUserinfo"

export default async function page() {

  return (
    <div className="grid place-items-center size-full">
      <div className="flex gap-6 flex-wrap">
          <ServerUserInfo />
          <ClientUserInfo />
      </div>
    </div>
  )
}