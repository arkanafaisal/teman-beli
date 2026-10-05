import { z } from "zod";

export const loginManualSchema = z.object({
  email: z.string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .refine((val) => val.endsWith('.ac.id'), {
      message: "Gunakan email berakhiran .ac.id",
    }),
  password: z.string()
    .min(6, "Password minimal 6 karakter")
});

export const setPasswordSchema = z.object({
  password: z.string()
    .min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string()
    .min(6, "Konfirmasi password minimal 6 karakter")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"]
});
