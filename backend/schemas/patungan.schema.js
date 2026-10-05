import { z } from 'zod';

const baseSchema = z.object({
  title: z.string().min(5).max(100),
  category: z.enum(['PANGAN', 'KOS', 'KAMPUS', 'DIGITAL']),
  unit: z.string().min(1),
  targetQuota: z.coerce.number().min(1),
  totalPrice: z.coerce.number().min(1000),
  currentQuota: z.coerce.number().min(1),
  area: z.string().min(3),
  deadline: z.string().min(1),
  whatsapp: z.string().regex(/^628[0-9]{7,13}$/),
  notes: z.string().max(300).optional(),
  refLink: z.string().url().or(z.literal('')).optional(),
}).refine(data => data.currentQuota <= data.targetQuota);

export const patunganSchema = baseSchema.superRefine((data, ctx) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const inputDate = new Date(data.deadline);

  if (inputDate < minDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Deadline untuk patungan baru minimal 3 hari dari waktu saat ini"
    });
  } else if (inputDate > maxDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Deadline maksimal 30 hari dari waktu saat ini"
    });
  }
});

export const updatePatunganSchema = baseSchema.and(
  z.object({
    updateComment: z.string().min(5).max(300)
  })
).superRefine((data, ctx) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const inputDate = new Date(data.deadline);

  if (inputDate < minDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Deadline saat update minimal 1 hari dari waktu saat ini"
    });
  } else if (inputDate > maxDate) {
    ctx.addIssue({
      path: ["deadline"],
      code: z.ZodIssueCode.custom,
      message: "Deadline maksimal 30 hari dari waktu saat ini"
    });
  }
});

export const finishPatunganSchema = z.object({
  proofLink: z.string().url("Format link bukti harus berupa URL yang valid.").min(1, "Link bukti diperlukan"),
});
