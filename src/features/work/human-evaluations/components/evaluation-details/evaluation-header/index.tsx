"use client";
import { ArrowUpFromLine, Link2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { retrieveHumanEvaluationOverview } from "@/features/work/human-evaluations/service/retrieve-evaluation-overview";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";
import { Show } from "@/components/ui/show";
import { Badge } from "@/components/ui/badge";

export function HumanEvaluationDetailsHeader() {
  const { id } = useParams<{ id: string }>();

  const setEvaluationDetails = useHumanEvaluationDetailsStore(state => state.setDataOverview);
  const evaluationDetails = useHumanEvaluationDetailsStore(state => state.evaluation);

  const retrieveQuestions = useCallback(async () => {
    try {
      const response = await retrieveHumanEvaluationOverview(id);
      if (response.data) setEvaluationDetails(response.data);
    } finally {}
  }, [id, setEvaluationDetails]);

  useEffect(() => {
    retrieveQuestions();
  }, [retrieveQuestions]);

  return (
    <>
      <header className="flex justify-between items-end h-20">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <Link href={"/workspace/work"}>Avaliações</Link>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              {evaluationDetails?.title || '-'} 
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>
          
          <div className="flex gap-2 mt-2">
            <Show when={evaluationDetails?.use_relevance ?? false}>
              <Badge variant="blue">Relevância</Badge>
            </Show>

            <Show when={evaluationDetails?.use_answerability ?? false}>
              <Badge variant="violet">Respondibilidade</Badge>
            </Show>

            <Show when={evaluationDetails?.use_utility ?? false}>
              <Badge variant="green">Utilidade</Badge>
            </Show>
          </div>
        </div>

        <div className="space-x-2">
          <Button variant="secondary">
            <ArrowUpFromLine />
            Questões
          </Button>

          <Button>
            <Link2 />
            Compartilhar
          </Button>
        </div>
      </header>
    </>
  );
}
