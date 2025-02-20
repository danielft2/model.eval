import { iHumanEvaluationStatus } from "@/core/interfaces/human-evaluation-status";
import { tHumanEvaluationCard } from "../../core/types/human-evaluation-card";

export interface iHumanEvaluationResponse {
  id: string;
  title: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  number_of_evaluations: number;
  status: iHumanEvaluationStatus;
}

export function iHumanEvaluationResponseToHumanEvaluationCard(
  data: iHumanEvaluationResponse
): tHumanEvaluationCard {
  return {
    id: data.id,
    title: data.title,
    useRelevance: data.use_relevance,
    useAnswerability: data.use_answerability,
    useUtility: data.use_utility,
    numberOfEvaluations: data.number_of_evaluations,
    status: data.status,
  };
}
