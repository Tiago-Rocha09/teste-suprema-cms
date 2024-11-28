import { z } from "zod";

// Atualizando o `pageSchema` com o campo `sections`
export const pageSchema = z.object({
  name: z.string().min(1, "Nome da página é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().optional(),
  section: z.any(),
});

export type PageSchema = z.infer<typeof pageSchema>;
