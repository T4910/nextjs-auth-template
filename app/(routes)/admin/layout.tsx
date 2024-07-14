import { ReactNode } from "react"
import { SideNavbar } from "./_components/Navbar"

export default function Adminlayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-radial-gradient py-4 flex gap-x-8">
        <SideNavbar />
        <div className="flex-grow">{children}</div>
    </div>
  )
}
