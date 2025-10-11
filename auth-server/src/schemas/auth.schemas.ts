// src/schemas/auth.schemas.ts
import { z } from 'zod';

// email: required + valid
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .trim()
  .email({ message: 'Please provide a valid email address' });

// base password: required + length
const basePasswordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(12, { message: 'Password must be at least 12 characters long.' })
  .max(512, { message: 'The length of the password is excessive.' });

// register schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: basePasswordSchema
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
      .regex(/[0-9]/, { message: 'Password must include at least one number.' })
      .regex(/[!@#$%^&*()_+\-=\[\]{}|;:'\",.<>\/?`~]/, {
        message: 'Password must include at least one special character'
      }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional()
  })
  .strict()
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  });

// login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: basePasswordSchema
});

// server-side user creation (no confirmPassword)
export const userSchema = registerSchema.omit({ confirmPassword: true });

// what you might return to client as a profile
export const userProfileSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' }),
  email: emailSchema,
  firstName: z.string().min(1).max(50).optional().nullable(),
  lastName: z.string().min(1).max(50).optional().nullable(),
  roles: z.array(z.string()).default([]),
  createdAt: z
    .preprocess(v => (typeof v === 'string' ? new Date(v) : v), z.date())
    .refine(d => d instanceof Date && !isNaN(d.getTime()), { message: 'Invalid date' }),
  __v: z.number().int().nonnegative().optional()
});
