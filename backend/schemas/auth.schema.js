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

export const loginGoogleSchema = z.object({
  credential: z.string().min(10).max(5000, "Token tidak valid")
});

export const updateProfileSchema = z.object({
  department: z.string().min(2, "Nama departemen minimal 2 karakter").max(100, "Nama departemen terlalu panjang").or(z.literal("")).nullable().optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal(""))
});

export const deleteProfileSchema = z.object({
  name: z.string().optional()
});