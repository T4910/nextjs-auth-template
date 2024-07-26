"use client"
import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage,
    FormDescription
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch"
import { useTransition, useRef, useState } from "react";
import { editUserDetails } from "@/actions/editUserDetails";
import { EditUserDetailsSchema } from "@/middleware/schema";
import { useCurrentUser } from "@/hooks/sessions";
import { Label } from "@/components/ui/label";

export function TwoFactorSetting() {
    const user = useCurrentUser();
    const [ checked, setChecked ] = useState(!!user?.is2fEnabled);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: z.infer<typeof EditUserDetailsSchema>) => {
        // if(values.is2fEnabled === user?.is2fEnabled) return;

        startTransition(() => {
            console.log(values);
            editUserDetails(values, user?.id as string, { is2fEnabled: true });
        });
    }

    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <Label
                    className=""
                    htmlFor="2FA"
                >
                    Two Factor Authentication
                </Label>
                <p
                    id="2FA"
                    className="text-sm text-muted-foreground"
                >
                    Enable two factor authentication for your account
                </p>
            </div>
                <Switch 
                    id="2FA"
                    disabled={isPending}
                    checked={checked}
                    onCheckedChange={(value) => {
                        setChecked(value);
                        onSubmit({
                            name: "",
                            email: "",
                            is2fEnabled: value
                        });
                    }}
                />
        </div>
    );
}
