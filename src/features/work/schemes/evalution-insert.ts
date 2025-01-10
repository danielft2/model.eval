import z from "zod";

export const evaluationInsertScheme = z.object({
  title: z.string().nonempty(),
  metric_id: z.string().nonempty().transform(value => parseInt(value)),
});

export type EvaluationInsert = z.infer<typeof evaluationInsertScheme>;