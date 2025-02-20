import { HumanEvaluation } from "@/core/entities/human-evaluation";
import { EHumanEvaluationStatus } from "@/core/enums";

type tHumanEvaluation = Omit<HumanEvaluation, 'status'>;

export type tHumanEvaluationDetails = tHumanEvaluation & {
  userId: number;
  numQuestionsOfEvaluator: number;
  status: EHumanEvaluationStatus;
};