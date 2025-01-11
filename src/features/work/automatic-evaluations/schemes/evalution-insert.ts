import z from "zod";

const modelConfigScheme = z
  .object({
    model_title_id: z.string().optional(),
    input_text: z.string().optional(),
  })
  .refine(
    (data) => {
      const { model_title_id, input_text } = data;
      return (model_title_id && input_text) || (!model_title_id && !input_text);
    },
    {
      message:
        "Ambos os campos devem ser preenchidos ou ambos devem estar vazios.",
      path: ["model_title_id"],
    }
  );

export const evaluationInsertScheme = z.object({
  title: z.string().nonempty("O título é obrigatório."),
  metric_id: z
    .string()
    .nonempty("A métrica é obrigatória.")
    .transform((value) => {
      const parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        throw new Error("A métrica é obrigatória.");
      }
      return parsedValue;
    }),
  model_dg: modelConfigScheme,
  model_qg: modelConfigScheme,
  model_qa: modelConfigScheme,
});

export type EvaluationInsertData = z.infer<typeof evaluationInsertScheme>;
