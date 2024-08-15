export default function Profilelayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div className="grid place-items-center p-4 min-h-screen bg-radial-gradient">{children}</div>
  );
}
