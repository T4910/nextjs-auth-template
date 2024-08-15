import { getUsersForAdmin } from "@/data/user";
import Image from "next/image";
import Functions from "./functions";
import { cn } from "@/lib/utils";

type ViewerProps = { 
    id?: string;
}

export default async function Viewer({ id }: ViewerProps){
  const [{ 
    name,
    email,
    image: imgsrc,
    ...details
  }]  = await getUsersForAdmin({ where: { id } }) ?? [];

  return (
    <div className="w-fit rounded-lg grid bg-white px-8 pb-8">
      <Functions id={id} />
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <Image 
            className="rounded-full bg-black"
            src={imgsrc ?? ""}
            alt={`Profile picture of ${name}`}
            width={200}
            height={200}
          />
          <span className="capitalize font-semibold">
            {name} 
          </span>
          <span>
            {email} 
          </span>

        </div>
        <div className="space-y-3">
          {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm min-w-full space-x-6">
                      <p className={cn(
                        "text-sm font-medium capitalize",
                        key === "id" && "uppercase"
                      )}>{key}</p>
                      <p className="text-xs truncate font-mono p-1 max-w-min bg-slate-100 rounded-md">
                        {value?.toString()}
                      </p>
                  </div>
                ))}
        </div>
      </div>
    </div>
  )
}