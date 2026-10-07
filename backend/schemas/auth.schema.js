import { z } from 'zod';

export const loginManualSchema = z.object({
  email: z.string()
    .email("Format email tidak valid")
    .refine((val) => val.endsWith('.ac.id'), {
      message: "Email harus merupakan email kampus (.ac.id)",
    }),
  password: z.string()
    .min(6, "Password minimal 6 karakter")
});

export const setPasswordSchema = z.object({
  password: z.string()
    .min(6, "Password minimal 6 karakter")
});

export const loginGoogleSchema = z.object({
  credential: z.string().min(10).max(5000, "Token tidak valid")
});
