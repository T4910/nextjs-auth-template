import { cn } from "@/lib/utils"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export type formFlashProps = {
  message?: String;
  type?: "success" | "error"
}

export default function formFlash({message, type = "error"}: formFlashProps) {
  if(!(!!message)) return

  return (
    <div
      className={cn(
        (type === "error") && "bg-destructive/15 text-destructive",
        (type === "success") && "bg-emerald-500/15 text-emerald-500",
        "p-3 rounded-md flex items-center gap-x-2 text-sm"
      )}
    >
      {(type === "error") && <HiOutlineExclamationTriangle className="size-5"/>}
      {(type === "success") &&  <IoIosCheckmarkCircleOutline className="size-5"/>}
      <p>{message}</p>
    </div>
  )
}