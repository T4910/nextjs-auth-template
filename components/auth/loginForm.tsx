"use client"

import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/cardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/middleware/schema";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import { login } from "@/actions/login"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";


export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [ flash, setFlash ] = useState<formFlashProps>({message: ""});

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFlash({message: ""});

    startTransition(() => {
      login(values)
        .then(data => setFlash(data));
    })
  }

  return (
    <CardWrapper
        headerLabel="Login"
        backBtnLabel="Don't have an account? Sign up"
        backBtnHref="/signup"
        showOtherAuth
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
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}