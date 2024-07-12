"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition, type ReactNode } from "react"
import { PasswordResetSchema } from "@/middleware/schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import { changePassword } from "@/actions/resetPassword"
import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";  
import { useCurrentUser } from "@/hooks/currentUser"

export function EditPasswordTrigger({ children }: { children: ReactNode }) {
    const user = useCurrentUser();
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

        startTransition(() => {
            changePassword(values, false, user?.email as string)
            .then(data => {
                setFlash(data);
                form.reset(); 
            });
        })
    }

    const onClose = () => {
        setTimeout(() => setFlash({ message: "" }), 100)
    }

    return (
        <Dialog
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {
                    (!!flash.message) ? (
                        <div className="grid place-items-center py-2 space-y-4">
                            <Flash {...flash}/>
                            {flash.type === "error" && (<Button className=""
                                onClick={() => setFlash({ message: "" })}
                            >
                                Try Again
                            </Button>)}
                        </div>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>
                                    Ensure you confirm your new password. Click on confirm when you're done
                                </DialogDescription>
                            </DialogHeader>
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
                                    Confirm 
                                    </Button>
                                </form>
                            </Form>        
                        </>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
