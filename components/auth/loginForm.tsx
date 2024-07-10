"use client"
import Link from "next/link";
import { z } from "zod";
import { login } from "@/actions/login"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/middleware/schema";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getUrlErrorDisplayMessage } from "@/lib/utils";
import Flash, { type formFlashProps } from "@/components/auth/formFlash"
import {
  Form, FormControl, FormField, FormDescription,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { TwoFactorForm } from "@/components/auth/twoFactorForm";

type loginActionReturn = formFlashProps & { showOtp?: boolean | undefined } | { type: string; message: string; showOtp?: undefined; };

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error'); // when NextAuth sends params to link for callbacks
  const urlErrorDisplayMessage = getUrlErrorDisplayMessage(urlError);
  
  const [ showOtp, setShowOtp ] = useState(false);
  const [ flash, setFlash ] = useState<formFlashProps>({ message: urlErrorDisplayMessage || "" });
  const [ isPending, startTransition ] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFlash({ message: "" });

    if(showOtp && flash?.type === "error") {
      form.resetField("pin");
      return setShowOtp(false);
    }
    
    // TODO: Remove url error when new submission made
    startTransition(() => {
      login(values)
        .then((data: loginActionReturn) => {
          if(!!data?.showOtp) return setShowOtp(true);
          setFlash(data as formFlashProps);
        });
    });
  }

  return (
    <CardWrapper
        headerLabel="Login"
        backBtnLabel={(showOtp && flash?.type === "error") ? "" : "Don't have an account? Sign up"}
        backBtnHref={(showOtp && flash?.type === "error") ? "" : "/signup"}
        showOtherAuth={!showOtp}
    >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className={(showOtp && flash?.type === "error") ? "space-y-2" : "space-y-6"}
          >
            <Flash {...flash}/>
            <div className="space-y-4">
              { showOtp ?
                ( 
                  flash?.type === "error" ? null : <TwoFactorForm form={form}/>
                ) : (
                  <>
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
                          <Button
                            asChild
                            size="sm"
                            variant="link"
                            className="px-0 font-normal"
                          >
                            <Link href="/reset-password">Forgot password?</Link>
                          </Button>        
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )
              }
            </div>            
            <Button
              type="submit"
              className={(showOtp && flash?.type === "error") ? "font-normal w-full underline" : "w-full" }
              variant={(showOtp && flash?.type === "error") ? "link" : "default"}
              disabled={isPending}
            >
              { 
                showOtp ? (
                  (flash?.type === "error") ? "Try Again" : "Confirm" 
                ) : "Login" 
              }
            </Button>
          </form>
        </Form>
    </CardWrapper>
  );
}