import { Evaluation } from "./evaluation";
import { EvaluatedModel } from "./evaluated-model";

export type AutomaticEvaluationDetails = {
  evaluation: Evaluation;
  models: EvaluatedModel[];
};