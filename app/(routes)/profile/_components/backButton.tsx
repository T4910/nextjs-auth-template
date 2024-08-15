"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.back()}
      variant="outline"
      className="p-2 size-10 rounded-full border-b-2 border-black"
    >
      <ArrowLeftIcon />
    </Button>
  )
}