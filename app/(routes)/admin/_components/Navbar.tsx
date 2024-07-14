import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { Navbtn } from "./Navbtn";
import { Navheading } from "./Navheading";
import { LogoutWrapper } from "@/components/auth/logOutWrapper";


export async function SideNavbar() {
  const user = await getCurrentUser();

  const navlinks = {
    dashboard: {
      icon: <MdOutlineSpaceDashboard className="size-6"/>,
      href: "/admin"
    },
    profile: {
      icon: <CgProfile className="size-6"/>,
      href: "/admin/profile"
    },
    templates: {
      icon: <MdOutlineMoreHoriz className="size-6"/>,
      href: "/admin/templates"
    }
  }

  return (
    <div>
        {/* <Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Button> */}
        <div className="p-6 px-7 ml-4 w-1/2 min-h-full rounded-md bg-white z-20 relative top-1/2 -translate-y-1/2 -left-96 lg:left-0 lg:w-fit ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center h-full">
            <Navheading name={user?.name} />
            <div className="flex-grow border-b border-gray-300 space-y-3 flex flex-col justify-start py-3">
              <>
                {Object.entries(navlinks).map(([name, { icon, href }]) => (
                    <Navbtn 
                      key={name}
                      icon={icon}
                      href={href}
                    >
                      {name}
                    </Navbtn>
                  ))}
              </>
            </div>
            <div className="border-b border-gray-300 space-y-3 flex flex-col justify-around py-3">
              <Navbtn 
                icon={( <MdOutlineSettings className="size-6" /> )}
                href="/admin/settings"
              >
                Settings
              </Navbtn>
            </div>
            <div className="space-y-3 flex flex-col justify-around pt-8 pb-2">
              <LogoutWrapper>
                <Button className="flex p-2 space-x-3.5 rounded-md justify-start w-full">
                  <MdOutlineLogout className="size-6" />
                  <h3 className="text-base">
                    Logout
                  </h3>
                </Button>
              </LogoutWrapper>
            </div>
          </div>
        </div>
    </div>
  );
}

