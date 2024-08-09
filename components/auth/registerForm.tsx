"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "@/middleware/schema";
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


export function RegisterForm({ isAdmin }: { isAdmin?: true }) {
  console.log(isAdmin, 98)
  const [isPending, startTransition] = useTransition();
  const [ flash, setFlash ] = useState<formFlashProps>({ message: "" });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
        cpassword:""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setFlash({ message: "" });

    startTransition(() => {
      register(values, isAdmin)
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
              <div className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                          <Input
                              {...field}
                              disabled={isPending}
                              placeholder="surname123"
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
                              type="email"
                          />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
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
              {isAdmin ? null : (<FormField
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
              />)}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isAdmin ? "Add User" : "Sign up"}
            </Button>
          </form>
        </Form>
  )
}