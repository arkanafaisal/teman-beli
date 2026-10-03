import { z } from "zod";

export const patunganSchema = z.object({
  title: z.string().min(5, { message: "Judul minimal 5 karakter" }).max(100, { message: "Judul maksimal 100 karakter" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  unit: z.string().min(1, { message: "Satuan tidak boleh kosong" }),
  targetQuota: z.coerce.number({ invalid_type_error: "Harus berupa angka" }).min(1, { message: "Target minimal 1" }),
  totalPrice: z.coerce.number({ invalid_type_error: "Harus berupa angka" }).min(1000, { message: "Harga minimal Rp 1.000" }),
  currentQuota: z.coerce.number({ invalid_type_error: "Harus berupa angka" }).min(1, { message: "Kuota awal minimal 1" }),
  area: z.string().min(3, { message: "Titik kumpul minimal 3 karakter" }),
  deadline: z.string().min(1, { message: "Tanggal deadline harus diisi" }),
  whatsapp: z.string().regex(/^628[0-9]{7,13}$/, { message: "Gunakan format 628... (10-15 angka)" }),
  notes: z.string().max(300, { message: "Catatan maksimal 300 karakter" }).optional(),
  refLink: z.string().url({ message: "Format link tidak valid" }).or(z.literal('')),
}).refine(data => data.currentQuota <= data.targetQuota, {
  message: "Kuota awal tidak boleh melebihi target",
  path: ["currentQuota"],
});
