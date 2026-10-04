import { z } from 'zod';

export const patunganSchema = z.object({
  title: z.string().min(5).max(100),
  category: z.string().min(1),
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
