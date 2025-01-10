import { AutomaticEvaluation } from "@/features/work/types/automatic-evaluation";

import { BrainCircuit, CircleCheck, TableProperties } from "lucide-react";
import Link from "next/link";
import { AutomaticEvaluationCardOptions } from "./automatic-evaluation-card-options";

type AutomaticEvaluationCardProps = {
  data: AutomaticEvaluation;
};

export function AutomaticEvaluationCard({
  data,
}: AutomaticEvaluationCardProps) {
  return (
    <div className="block rounded-lg border overflow-hidden border-slate-300 min-w-[400px] flex-1 font-heading relative">
      <Link href={`/workspace/work/evaluations/${data.id}`}>
        <div className="bg-slate-100 space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading -tracking-wider text-base font-medium">
              {data.title}
            </h1>
          </div>

          <div className="text-sm -tracking-wider space-y-2">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-slate-600" />
              <p className="text-slate-600">
                <strong className="font-medium text-slate-800">
                  {data.models_configured} modelos
                </strong>{" "}
                configurados
              </p>
            </div>

            <div className="flex items-center gap-2">
              <TableProperties size={18} className="text-slate-600" />
              <p className="text-slate-600">
                Conjunto de teste com{" "}
                <strong className="font-medium text-slate-800">
                  {data.filename_test_count} registros
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-1 border-t border-slate-300">
          <CircleCheck size={16} className="text-green-700" />
          <p className="font-heading -tracking-wider font-medium text-sm text-slate-800">
            {data.models_evaluated} Modelo avaliado
          </p>
        </div>
      </Link>

      <AutomaticEvaluationCardOptions evaluationId={data.id}/>
    </div>
  );
}
