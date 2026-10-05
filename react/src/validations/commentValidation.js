import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(2, { message: "Komentar minimal 2 karakter" }).max(500, { message: "Komentar maksimal 500 karakter" })
});
