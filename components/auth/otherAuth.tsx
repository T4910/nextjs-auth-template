import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Google, GitHub, Twitter, Facebook, Email SSO

export function OtherAuth() {
  return (
    <div className="flex items-center flex-wrap w-full gap-2">
        <Button
            size="lg"
            className="w-full"
            variant="outline"
            // onClick={() => {console.log('google')}}
        >
            <FcGoogle className="size-5"/>
        </Button>
        <Button
            size="lg"
            className="w-full"
            variant="outline"
            // onClick={() => {console.log('github')}}
        >
            <FaGithub className="size-5"/>
        </Button>
    </div>
  )
}