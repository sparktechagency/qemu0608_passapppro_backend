import {z} from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
})

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export const UpdateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.email().optional()
});