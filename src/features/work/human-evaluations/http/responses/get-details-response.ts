import { EHumanEvaluationStatus } from "@/core/enums";
import { tHumanEvaluationDetails } from "../../core/types/human-evaluation-details";

export interface iHumanEvaluationDetails {
  id: string;
  user_id: number;
  title: string;
  num_questions_of_evaluator: number;
  instructions: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status: EHumanEvaluationStatus;
}

export function iHumanEvaluationDetailsToHumanEvaluationDetails(
  data: iHumanEvaluationDetails
): tHumanEvaluationDetails {
  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    numQuestionsOfEvaluator: data.num_questions_of_evaluator,
    instructions: data.instructions,
    useRelevance: data.use_relevance,
    useAnswerability: data.use_answerability,
    useUtility: data.use_utility,
    status: data.status,
  };
}
