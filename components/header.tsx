type headerProps = {
    label: string
}

export function Header({ label }: headerProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className="text-3xl font-semibold">{label}</h1>
    </div>
  )
}