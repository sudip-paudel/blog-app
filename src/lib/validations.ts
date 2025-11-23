import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z
    .string()
    .max(300, "Excerpt must be less than 300 characters")
    .transform((val) => val || undefined)
    .optional(),
  category: z
    .string()
    .transform((val) => val || undefined)
    .optional(),
  tags: z.array(z.string()).default([]),
});
