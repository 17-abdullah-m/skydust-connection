import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120).toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  companyName: z.string().trim().min(2, "Enter a company name").max(80).optional(),
  inviteToken: z.string().trim().max(80).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120).toLowerCase(),
  password: z.string().min(1, "Enter your password").max(72),
});

export const inviteSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120).toLowerCase(),
});

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120).toLowerCase(),
  companyName: z.string().trim().min(2, "Enter a company or space name").max(80),
  notes: z.string().trim().max(2000).optional().default(""),
});

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(80),
        qty: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "Cart is empty")
    .max(50),
});
