import { retrieveAutomaticEvaluationsAction } from "@/features/work/actions/retrieve-automatic-evaluations";
import { AutomaticEvaluationCard } from "./automatic-evaluation-card";

export async function AutomaticEvaluationList() {
  const automaticEvaluations = await retrieveAutomaticEvaluationsAction();

  return (
    <div className="flex flex-wrap gap-4">
      {automaticEvaluations.data?.map((evaluation) => (
        <AutomaticEvaluationCard data={evaluation} key={evaluation.id} />
      ))}
    </div>
  );
}
