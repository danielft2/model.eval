export type HumanEvaluationDetails = {
  id: string;
  user_id: number;
  title: string;
  num_questions_of_evaluator: number;
  instructions: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status_id: number;
};