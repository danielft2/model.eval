import { retieveHumanEvaluations } from "@/features/work/human-evaluations/service/retrieve-evaluations";
import { HumanEvaluationCard } from "./evaluation-card";

export async function HumanEvaluationsList() {
  const response = await retieveHumanEvaluations();

  return (
    <div>
      {response.data?.map((evaluation) => (
        <HumanEvaluationCard key={evaluation.id} data={evaluation} />
      ))}
    </div>
  );
}
