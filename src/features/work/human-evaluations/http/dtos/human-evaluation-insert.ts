export type HumanEvaluationInsertDto = {
  title: string;
  num_questions_of_evaluator: number;
  instructions: string;
  useRelevance: boolean;
  useAnswerability: boolean;
  useUtility: boolean;
}