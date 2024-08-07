import { z } from 'zod';
import { Roles } from "@prisma/client";


export const LoginSchema = z.object({
    email: z.string().min(1, {
        message: "Username or Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    pin: z.optional(
        z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    )
});


export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string()
    .min(6, "Minimum 6 characters required")
    .max(15, "Maximum 15 characters required"),
    cpassword: z.string()
})
// fix this issue of them not syncing
.refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
})
.refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["password"], 
});


export const RequestResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});


export const PasswordResetSchema = z.object({
    password: z.string()
        .min(6, "Minimum 6 characters required")
        .max(15, "Maximum 15 characters required"),
    cpassword: z.string()
})
// fix this issue of them not syncing
.refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
})
.refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["password"],
});

export const EditUserDetailsSchema = z.object({
    name: z.string().min(1, {
        message: "Username is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    // role: z.enum([Roles.ADMIN, Roles.USER]),
    is2fEnabled: z.boolean()

})