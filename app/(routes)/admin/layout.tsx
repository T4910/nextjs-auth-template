import { ReactNode } from "react"
import { SideNavbar } from "./_components/Navbar"

export default function Adminlayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-radial-gradient flex p-4 space-x-4">
        <SideNavbar />
        <div className="flex-grow">{children}</div>
    </div>
  )
}
