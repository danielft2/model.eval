import { HumanEvaluationDetails } from "@/features/work/human-evaluations/http/responses/get-details-response";

export type HumanEvaluationOverview = {
  evaluation: HumanEvaluationDetails;
  imported_questions: ImportedQuestion[];
};

export type ImportedQuestion = {
  id: string;
  descriptorCode: string;
}
