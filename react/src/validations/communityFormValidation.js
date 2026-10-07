import { z } from "zod";

export const communitySchema = z.object({
  judul: z.string().min(5, { message: "Judul minimal 5 karakter" }).max(100, { message: "Judul maksimal 100 karakter" }),
  kategoriKey: z.enum(['MAKAN', 'KAMPUS', 'KOS'], { errorMap: () => ({ message: "Kategori tidak valid" }) }),
  lokasi: z.string().min(3, { message: "Lokasi minimal 3 karakter" }),
  ringkasan: z.string().min(10, { message: "Ringkasan minimal 10 karakter" }).max(50, { message: "Ringkasan maksimal 50 karakter" }),
  deskripsiLengkap: z.string().min(20, { message: "Deskripsi minimal 20 karakter" }).max(500, { message: "Deskripsi maksimal 500 karakter" }),
});
