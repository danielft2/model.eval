import z from "zod";

export const modelConfigScheme = z.object({
  model_title_id: z.string(),
  input_text: z.string(),
});

export type ModelConfig = z.infer<typeof modelConfigScheme>;