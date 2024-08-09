"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InviteUserSchema, RegisterSchema } from "@/middleware/schema";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import { register } from "@/actions/register"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { inviteUser } from "@/actions/inviteUser";


export function InviteUserForm() {
  const [isPending, startTransition] = useTransition();
  const [ flash, setFlash ] = useState<formFlashProps>({ message: "" });

  const form = useForm<z.infer<typeof InviteUserSchema>>({
    resolver: zodResolver(InviteUserSchema),
    defaultValues: {
        email: ""
    }
  })

  const onSubmit = (values: z.infer<typeof InviteUserSchema>) => {
    setFlash({ message: "" });

    startTransition(() => {
      inviteUser(values)
        .then(data => setFlash(data));
    })

    form.reset();
  }

  return (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Flash {...flash}/>
            <div className="space-y-4">
              <div className="flex w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                          <Input
                              {...field}
                              disabled={isPending}
                              placeholder="surname.name@example.com"
                              type="email"
                          />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Invite User
            </Button>
          </form>
        </Form>
  )
}