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
import { Label } from "@/components/ui/label"
import { useState, useTransition, type ReactNode } from "react"
import { EditUserDetailsSchema } from "@/middleware/schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage,
    FormDescription
} from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/sessions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { editUserDetails } from "@/actions/editUserDetails"
import { useRouter } from "next/navigation"
import { filterObjectByKeys } from "@/lib/utils"
import { type EdittedUserSessionDetails } from "@/middleware/auth"

export function EditDetailsTrigger({ children, user }: { children: ReactNode, user: EdittedUserSessionDetails }) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [ flash, setFlash ] = useState<formFlashProps>({ message: "" });

    const form = useForm<z.infer<typeof EditUserDetailsSchema>>({
        resolver: zodResolver(EditUserDetailsSchema),
        defaultValues: {
            name: user?.name as string,
            email: user?.email as string,
            // role: user?.role,
            is2fEnabled: user?.is2fEnabled
        }
    })

    const onSubmit = (values: z.infer<typeof EditUserDetailsSchema>) =>  {
        setFlash({ message: "" });
        
        // Not Type safe, but it works
        const edittedValues = filterObjectByKeys(form.formState.dirtyFields, values);
        if(Object.keys(edittedValues).length === 0) return;

        startTransition(() => {
            editUserDetails(values, user?.id as string, form.formState.dirtyFields)
            .then(data => {               
                setFlash(data as formFlashProps);
                form.reset(data.type === "success" ? form.getValues() : undefined); 
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
                                onClick={() => {
                                    setFlash({ message: "" })
                                }}
                            >
                                Try Again
                            </Button>)}
                        </div>
                    ) : (
                        <>
                            <DialogHeader>
                            <DialogTitle>Edit Details</DialogTitle>
                            <DialogDescription>
                                Make changes to your details here. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form 
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    {/* <Flash {...flash}/> */}
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isPending}
                                                            placeholder="username"
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="surname.name@example.com"
                                                        type="text"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel> 
                                                    <Select
                                                        disabled={isPending}
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue 
                                                                    placeholder="Selet a role"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={Roles.ADMIN}>
                                                                Admin
                                                            </SelectItem>
                                                            <SelectItem value={Roles.USER}>
                                                                User
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                        <FormField
                                            control={form.control}
                                            name="is2fEnabled"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Two Factor Authentication</FormLabel>
                                                        <FormDescription>
                                                            Enable two factor authentication for your account
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch 
                                                            disabled={isPending}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
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
                                        disabled={isPending || (Object.keys(form.formState.dirtyFields).length === 0)}
                                    >
                                        Save
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
