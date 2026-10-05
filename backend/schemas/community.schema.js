import { z } from 'zod';

export const createCommunitySchema = z.object({
  judul: z.string().min(1, 'Judul Tempat / Promo tidak boleh kosong'),
  kategoriKey: z.string().min(1, 'Kategori tidak boleh kosong'),
  lokasi: z.string().min(1, 'Lokasi tidak boleh kosong'),
  ringkasan: z.string().min(1, 'Ringkasan info singkat tidak boleh kosong'),
  deskripsiLengkap: z.string().min(1, 'Deskripsi lengkap tidak boleh kosong')
});
