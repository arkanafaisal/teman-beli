import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1, { message: "Komentar tidak boleh kosong" }).max(200, { message: "Komentar maksimal 200 karakter" })
});
