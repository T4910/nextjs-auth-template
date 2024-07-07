import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShowLoginWrapper } from "@/components/auth/showLoginWrapper";

type RouteButtonProps = {
  children: React.ReactNode,
  href: string
}

export default function Home() {
  return (
    <div className="grid place-items-center h-screen bg-radial-gradient">
      <div className="container mx-auto space-y-16">
        <h1 className="md:text-6xl text-4xl text-white font-extrabold text-center">Nextjs authentication using NextAuth & Prisma ORM</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <RouteButton href="/">Home</RouteButton>
          <ShowLoginWrapper>
            <Button        
              variant="outline"
              className="text-xl bg-white/80 border-4 min-w-full">Login</Button>
          </ShowLoginWrapper>
          <ShowLoginWrapper>
            <Button        
              variant="outline"
              className="text-xl bg-white/80 border-4 w-full">Login Popup</Button>
          </ShowLoginWrapper>
          <RouteButton href="/signup">Signup</RouteButton>
          <RouteButton href="/about">About</RouteButton>
          <RouteButton href="/dashboard">Dashboard</RouteButton>
        </div>
        
      </div>
    </div>
  );
}

const RouteButton = ({children, href}: RouteButtonProps) => {
  return (
    <Link href={href}>
      <Button 
        variant="outline"
        className="text-xl bg-white/80 border-2 w-full"
      >{children}</Button>
    </Link>
  );
}