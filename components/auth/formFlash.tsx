import { cn } from "@/lib/utils"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { MdErrorOutline } from "react-icons/md";

export type formFlashProps = {
  message?: string;
  type?: "success" | "error" | "warning"
}

export default function formFlash({message, type = "error"}: formFlashProps) {
  if(!(!!message)) return

  return (
    <div
      className={cn(
        (type === "error") && "bg-destructive/15 text-destructive",
        (type === "warning") && "bg-yellow-500/15 text-yellow-500",
        (type === "success") && "bg-emerald-500/15 text-emerald-500",
        "p-3 rounded-md flex items-center gap-x-3 text-sm"
      )}
    >
      {(type === "error") && <MdErrorOutline className="size-5"/>}
      {(type === "warning") &&  <HiOutlineExclamationTriangle className="size-5"/>}
      {(type === "success") &&  <IoIosCheckmarkCircleOutline className="size-5"/>}
      <p className="w-11/12">{message}</p>
    </div>
  )
}