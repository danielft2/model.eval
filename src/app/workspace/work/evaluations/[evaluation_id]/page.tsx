import { Divider } from "@/components/ui/divider";
import { retrieveEvaluationDetails } from "@/features/work/automatic-evaluations/service/retrieve-evaluation-details";
import { EvaluationDetailsHeader } from "@/features/work/automatic-evaluations/components/evaluation-details/evaluation-details-header";
import { EvaluateModelCard } from "@/features/work/automatic-evaluations/components/evaluation-details/evaluate-model-card";

type Params = {
  evaluation_id: string;
};

export default async function EvaluationDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { evaluation_id } = await params;
  const details = await retrieveEvaluationDetails(evaluation_id);
  const avaliableForEvaluation = !!details.data?.evaluation.filename_test;

  return (
    <>
      <EvaluationDetailsHeader />

      <Divider />

      <section className="mt-8 flex flex-wrap gap-4">
        {details.data?.models.map((model) => (
          <EvaluateModelCard
            key={model.id}
            model={model}
            isAvaliableForEvaluation={avaliableForEvaluation}
          />
        ))}
      </section>
    </>
  );
}
