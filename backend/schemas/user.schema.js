import { z } from 'zod';

export const userQuerySchema = z.object({
  q: z.string().max(100, "Kata kunci pencarian terlalu panjang").optional(),
  status: z.enum(['active', 'deleted', 'all']).optional()
});
