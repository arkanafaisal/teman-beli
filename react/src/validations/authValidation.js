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

// Schema for setting password has been merged into updateProfileSchema

export const updateProfileSchema = z.object({
  department: z.string().min(2, "Nama departemen minimal 2 karakter").max(100, "Nama departemen maksimal 100 karakter").or(z.literal("")),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal(""))
});
