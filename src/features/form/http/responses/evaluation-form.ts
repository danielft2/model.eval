import { HumanEvaluation } from "@/core/entities/human-evaluation";
import { ImportedQuestion } from "@/core/entities/imported-question";

type Evaluation = Omit<HumanEvaluation, "id">;

export type EvaluationFormResponse = {
  questions: ImportedQuestion[];
  evaluation: Evaluation;
}
