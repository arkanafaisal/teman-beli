import { z } from 'zod';

export const createCommunitySchema = z.object({
  judul: z.string().min(1, 'Judul Tempat / Promo tidak boleh kosong'),
  kategoriKey: z.enum(['kuliner', 'cetak', 'laundry', 'promo'], { errorMap: () => ({ message: "Kategori tidak valid" }) }),
  lokasi: z.string().min(1, 'Lokasi tidak boleh kosong'),
  ringkasan: z.string().min(1, 'Ringkasan info singkat tidak boleh kosong'),
  deskripsiLengkap: z.string().min(1, 'Deskripsi lengkap tidak boleh kosong')
});

export const createCommunityCommentSchema = z.object({
  text: z.string().min(2, "Komentar minimal 2 karakter").max(500, "Komentar maksimal 500 karakter")
});

export const communityQuerySchema = z.object({
  q: z.string().min(1, "Kata kunci tidak boleh kosong").max(100, "Kata kunci terlalu panjang").optional(),
  category: z.string().regex(/^(kuliner|cetak|laundry|promo)(,(kuliner|cetak|laundry|promo))*$/, "Format kategori tidak valid").optional()
});
