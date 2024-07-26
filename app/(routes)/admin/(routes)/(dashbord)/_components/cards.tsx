import { InfoCard } from "./card"
import { FiUserPlus } from "react-icons/fi"; 
import { FiUsers } from "react-icons/fi"; 
import { FiUser } from "react-icons/fi";
import { FiUserX } from "react-icons/fi";

export function Cards() {
  return (
    <div className="flex justify-between h-36">
        <InfoCard 
            title="Active Users"
            amount={10}
            footer="helo"
            icon={<FiUser />}
        />
        <InfoCard 
            title="Offline Users"
            amount={10}
            footer="helo"
            icon={<FiUserX />}
        />
        <InfoCard 
            title="Total Users"
            amount={10}
            footer="helo"
            icon={<FiUsers />}
        />
        <InfoCard 
            title="New Users"
            amount={10}
            footer="helo"
            icon={<FiUserPlus />}
        />
    </div>
  )
}