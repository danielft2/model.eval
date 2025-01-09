import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { retrieveAutomaticEvaluationDetails } from "@/features/work/actions/retrieve-automatic-evaluation-details";
import { EvaluateModelCard } from "@/features/work/components/evaluate-model-card";
import { ArrowUpFromLine } from "lucide-react";
import Link from "next/link";

type Params = {
  evaluation_id: string;
}

export default async function EvaluationDetailsPage({ params }: { params: Params }) {
  const { evaluation_id } = await params;
  const details = await retrieveAutomaticEvaluationDetails(evaluation_id);

  return (
    <>
      <header className="mb-6 flex justify-between items-center">
        <div> 
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <Link href={"/workspace/work"} className="">
              Avaliações
            </Link>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              Avaliação google/flan-t5-base{" "}
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>
        </div>
        
        <Button variant="secondary">
          <ArrowUpFromLine />
          Importar arquivo de teste
        </Button>
      </header>

      <Divider />

      <section className="mt-8 flex flex-wrap gap-4">
        { details.data?.models.map((model) => (
          <EvaluateModelCard key={model.id} model={model} />
        ))}
      </section>
    </>
  );
}
