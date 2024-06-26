"use client"
import { z } from "zod";
import { login } from "@/actions/login"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/middleware/schema";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { url } from "inspector";


export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  let urlErrorDisplayMessage;
  
  // For nextauth errors
  switch (urlError) {
    case 'OAuthAccountNotLinked':
      urlErrorDisplayMessage = "Email already in use with different provider";
      break;
    
    case null:
      urlErrorDisplayMessage = null;
      break;

    default:
      urlErrorDisplayMessage = "Something went wrong!";
      break;
  }

  const [ flash, setFlash ] = useState<formFlashProps>({ message: urlErrorDisplayMessage || "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFlash({message: ""});

    startTransition(() => {
      login(values)
        .then(data => setFlash(data));
        // TODO: Add 2FA
    });
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
  );
}