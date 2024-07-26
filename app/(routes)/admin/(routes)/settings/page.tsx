import SettingSection from "../../_components/SettingSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TwoFactorSetting } from "./twoFactorSetting";

export default async function page() {
    return (
      <div className="size-full bg-white rounded-md p-8">
          <SettingSection heading="Preferences">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-8">
                <p>Theme</p>
                <Select defaultValue="system">
                  <SelectTrigger className="w-fit ">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>  
              <div className="flex items-center space-x-8">
                <p>Language</p>
                <Select defaultValue="en-us">
                  <SelectTrigger className="w-fit ">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-us">English US</SelectItem>
                    <SelectItem value="en-uk">English UK</SelectItem>
                    <SelectItem value="en-ng">English NG</SelectItem>
                  </SelectContent>
                </Select>
              </div>  
            </div>
          </SettingSection>
          <SettingSection heading="Security">
            <TwoFactorSetting />
          </SettingSection>
      </div>
    )
  }