import { Divider } from "@/components/ui/divider";
import { retrieveAutomaticEvaluationDetails } from "@/features/work/actions/retrieve-automatic-evaluation-details";
import { EvaluateModelCard } from "@/features/work/components/evaluate-model-card";
import { Header } from "@/features/work/components/header";

type Params = {
  evaluation_id: string;
};

export default async function EvaluationDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { evaluation_id } = await params;
  const details = await retrieveAutomaticEvaluationDetails(evaluation_id);
  const avaliableForEvaluation = !!details.data?.evaluation.filename_test

  return (
    <>
      <Header />

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
