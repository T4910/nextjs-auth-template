"use client"
import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/cardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { PasswordResetSchema } from "@/middleware/schema";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import { changePassword } from "@/actions/resetPassword"
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";


export function NewPassForm() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const token = searchParams.get("code") as string;

    const [isPending, startTransition] = useTransition();
    const [ flash, setFlash ] = useState<formFlashProps>({ message: "" });

    const form = useForm<z.infer<typeof PasswordResetSchema>>({
        resolver: zodResolver(PasswordResetSchema),
        defaultValues: {
            password: "",
            cpassword:""
        }
    })

    const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
        setFlash({ message: "" });

        if(!token) return setFlash({ type: "error", message: "Missing Token" }); 

        startTransition(() => {
            changePassword(values, token)
                .then(data => {
                    setFlash({ loading: true, ...data });
                    if(data.type === "success") return router.push("/login");
                });
        })

        form.reset();
    }

    return (
        <CardWrapper
            headerLabel="Change password"
            backBtnLabel="Back to login"
            backBtnHref="/login"
        >
            <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <Flash {...flash}/>
                <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cpassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                >
                Change Password
                </Button>
            </form>
            </Form>
        </CardWrapper>
    )
}