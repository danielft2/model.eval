import { HumanEvaluation } from "@/core/entities/human-evaluation";

type tHumanEvaluation = Omit<HumanEvaluation, 'instructions'>;

export type tHumanEvaluationCard = tHumanEvaluation & {
  numberOfEvaluations: number;
}