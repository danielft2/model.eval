import { IHumanEvaluationStatus } from "@/domain/interfaces/human-evaluation-status";

export type HumanEvaluation = {
  id: string;
  title: string;
  instructions: string;
  useRelevance: boolean;
  useAnswerability: boolean;
  useUtility: boolean;
  status: IHumanEvaluationStatus;
}

