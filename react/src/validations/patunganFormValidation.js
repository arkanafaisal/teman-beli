import { z } from "zod";

export const basePatunganSchema = z.object({
  title: z.string().min(5, { message: "Judul minimal 5 karakter" }).max(100, { message: "Judul maksimal 100 karakter" }),
  category: z.enum(['PANGAN', 'KOS', 'KAMPUS', 'DIGITAL'], { errorMap: () => ({ message: "Kategori tidak valid" }) }),
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

export const patunganSchema = basePatunganSchema.superRefine((data, ctx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 3);

  if (new Date(data.deadline) < minDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Tenggat waktu harus minimal 3 hari dari sekarang"
    });
  }
});

export const updatePatunganSchema = basePatunganSchema.and(
  z.object({
    updateComment: z.string().min(5, { message: "Pesan pembaruan minimal 5 karakter" }).max(300)
  })
).superRefine((data, ctx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);

  if (new Date(data.deadline) < minDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Tenggat waktu (update) harus minimal 1 hari dari sekarang"
    });
  }
});
