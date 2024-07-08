import { cn } from "@/lib/utils"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { MdErrorOutline } from "react-icons/md";
import { Loaders } from "@/components/loaders";

export type formFlashProps = {
  message?: string;
  type?: "success" | "error" | "warning"
  loading?: boolean
}

export default function formFlash({message, type = "error", loading}: formFlashProps) {
  if(!(!!message)) return

  return (
    <div
      className={cn(
        (type === "error") && "bg-destructive/15 text-destructive",
        (type === "warning") && "bg-yellow-500/15 text-yellow-500",
        (type === "success") && "bg-emerald-500/15 text-emerald-500",
        "p-3 rounded-md flex items-center gap-x-3 text-sm",
      )}
    >
      {(type === "error" && !loading) && <MdErrorOutline className="size-5"/>}
      {(type === "warning" && !loading) &&  <HiOutlineExclamationTriangle className="size-5"/>}
      {(type === "success" && !loading) &&  <IoIosCheckmarkCircleOutline className="size-5"/>}

      {(loading) && <Loaders type="Clip" />}
      <p className="w-11/12">{message}</p>
    </div>
  )
}