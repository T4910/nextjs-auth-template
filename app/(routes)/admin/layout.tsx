import { ReactNode } from "react"
import { SideNavbar } from "./_components/Navbar"

export default function Adminlayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-radial-gradient py-4 flex">
        <SideNavbar />
        <div>{children}</div>
    </div>
  )
}
