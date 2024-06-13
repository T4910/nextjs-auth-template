import { Button } from "@/components/ui/button"
import Link from "next/link"

type linkButtonProps = {
    label: string,
    href: string
}

export function LinkButton({
    href,
    label
}: linkButtonProps) {
  return (
    <Button
        variant="link"
        className="font-normal w-full"
        size="sm"
        asChild
    >
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}