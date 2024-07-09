"use client"
import { z } from "zod";
import { requestResetPassword } from "@/actions/resetPassword"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestResetSchema } from "@/middleware/schema";
import { useState, useTransition } from "react";
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";


export function ResetForm() {
  const [ flash, setFlash ] = useState<formFlashProps>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RequestResetSchema>>({
    resolver: zodResolver(RequestResetSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = (values: z.infer<typeof RequestResetSchema>) => {
    setFlash({ message: "" });
    
    console.log(values);
    startTransition(() => {
      requestResetPassword(values)
        .then(data => setFlash(data as formFlashProps));
        // TODO: Add 2FA
    });
  }

  return (
    <CardWrapper
        headerLabel="Reset your password"
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
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Send Reset Email
            </Button>
          </form>
        </Form>
    </CardWrapper>
  );
}