import { MetricsResult } from "@/features/work/human-evaluations/http/responses/get-allquestions-overview";
import { ImportedQuestion } from "@/core/entities/imported-question";

export type QuestionOverview = {
  question: ImportedQuestion;
  metrics_result: MetricsResult;
  number_of_evaluations: number;
}

