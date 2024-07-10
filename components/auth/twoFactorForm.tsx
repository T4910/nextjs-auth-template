import { z } from "zod";
import { LoginSchema } from "@/middleware/schema";
import { type UseFormReturn } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
    FormControl, FormField, FormDescription,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
    InputOTP, InputOTPSlot,
    InputOTPGroup, InputOTPSeparator,
} from "@/components/ui/input-otp";


export function TwoFactorForm({ form }: { form: UseFormReturn<z.infer<typeof LoginSchema>> }) {
  return (
    <FormField
        control={ form.control }
        name="pin"
        render={({ field }) => (
            <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                    <InputOTP 
                        maxLength={6} 
                        pattern={REGEXP_ONLY_DIGITS} 
                        className="justify-center"
                        {...field}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </FormControl>
                <FormDescription>
                Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}