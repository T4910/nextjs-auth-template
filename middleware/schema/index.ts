import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
});

export const RegisterSchema = z
    .object({
        username: z.string({
            message: "Username is required"
        }),
        email: z.string().email({
            message: "Email is required"
        }),
        password: z.string().min(6, {
            message: "Minimum 6 characters required",
        }),
        cpassword: z.string()
    })
    .refine((data) => data.password === data.cpassword, {
        message: "Passwords don't match",
        path: ["cpassword"],
    })
    .refine((data) => data.password === data.cpassword, {
        message: "Passwords don't match",
        path: ["password"],
        
    });
