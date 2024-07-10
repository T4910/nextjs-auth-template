import Link from "next/link"
import { Button } from "@/components/ui/button"

type linkButtonProps = {
    label: string,
    href: string
}

export function LinkButton({ href, label }: linkButtonProps) {
 return (
    <Button
        variant="link"
        className="font-normal w-full underline"
        size="sm"
        asChild
    >
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}