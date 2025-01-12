import Link from "next/link";
import { Suspense } from "react";
import { CircleCheck, CircleMinus } from "lucide-react";

import { HumanEvaluationResponse } from "@/features/work/human-evaluations/http/responses/human-evaluations";
import { HumanEvaluationStatus } from "@/features/work/human-evaluations/types/evaluation-status";
import { Badge } from "@/components/ui/badge";
import { HumanEvaluationCardOptions } from "./evaluation-card-options";

type HumanEvaluationCardProps = {
  data: HumanEvaluationResponse;
};

export function HumanEvaluationCard({ data }: HumanEvaluationCardProps) {
  const existsEvaluations = data.evaluation_total > 0;

  return (
    <div className="block rounded-lg border overflow-hidden border-slate-300 min-w-[400px] flex-1 font-heading relative">
      <Link href={`/workspace/work/evaluations/`}>
        <div className="bg-slate-100 space-y-1 p-4">
          <h1 className="font-heading -tracking-wider text-base font-medium">
            {data.title}
          </h1>
          <div className="flex items-center gap-1">
            {data.use_relevance && <Badge variant="blue">Relevância</Badge>}
            {data.use_answerability && (
              <Badge variant="violet">Respondibilidade</Badge>
            )}
            {data.use_utility && <Badge variant="green">Utilidade</Badge>}
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-1 border-t border-slate-300">
          {existsEvaluations ? (
            <CircleCheck size={16} className="text-green-700" />
          ) : (
            <CircleMinus size={14} className="text-slate-600" />
          )}
          <p className="font-heading -tracking-wider font-medium text-sm text-slate-800">
            {existsEvaluations
              ? `${data.evaluation_total} avaliações`
              : "Ainda não possui avaliações"}
          </p>
        </div>
      </Link>

      {data.status.id == HumanEvaluationStatus.UNAVAILABLE && (
        <Suspense>
          <HumanEvaluationCardOptions evaluationId={data.id} />
        </Suspense>
      )}
    </div>
  );
}
