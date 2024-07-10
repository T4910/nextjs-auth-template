import React from "react"

export default function Authlayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div className="grid place-items-center min-h-screen bg-radial-gradient">{children}</div>
  )
}