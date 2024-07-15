import { UserPicture } from "../../dashboard/_components/UserPicture";

export function Navheading({ name }: { name: string | null | undefined }) {
    return (
        <>
            <div className="mx-auto mb-2">
                <UserPicture />
            </div>
            <h1 className="text-base cursor-pointer font-bold text-primary border-b border-gray-300 pb-4 w-full">
                <p>Welcome Admin,</p>
                {!!name && <p>{name}</p>}
            </h1>
        </>
    )
}