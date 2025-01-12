export type HumanEvaluationResponse = {
  id: string;
  title: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status: Status;
  evaluation_total: number;
}

interface Status {
  id: number;
  name: string;
}