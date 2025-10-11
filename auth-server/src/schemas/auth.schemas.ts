import { z } from 'zod';

// email: required + valid
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .trim()
  .email({ message: 'Please provide a valid email address' });

// base password: required + length + complexity
const basePasswordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(12, { message: 'Password must be at least 12 characters long.' })
  .max(512, { message: 'The length of the password is excessive.' })
  .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must include at least one number.' })
  .regex(/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?`~]/, {
    message: 'Password must include at least one special character'
  });

// register schema (with password confirmation)
export const registerSchema = z
  .object({
    email: emailSchema,
    password: basePasswordSchema,
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' })
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

// server-side user creation (omit confirmPassword)
export const userSchema = registerSchema.omit({ confirmPassword: true });

// what you might return to client as a profile
export const userProfileSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' }),
  email: emailSchema,
  roles: z.array(z.string()).default([]),
  createdAt: z
    .preprocess(v => (typeof v === 'string' ? new Date(v) : v), z.date())
    .refine(d => d instanceof Date && !isNaN(d.getTime()), { message: 'Invalid date' }),
  __v: z.number().int().nonnegative().optional()
});
