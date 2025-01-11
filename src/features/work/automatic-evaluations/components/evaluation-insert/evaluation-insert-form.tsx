"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard } from "react-use-wizard";
import { toast } from "sonner";
import { z } from "zod";

import { insertEvaluationAction } from "@/features/work/automatic-evaluations/actions/insert-evaluation";
import { evaluationInsertScheme } from "@/features/work/automatic-evaluations/schemes/evalution-insert";

import { ChoiceEvaluateMetric } from "./steps/choice-evaluate-metric";
import { ModelDGConfig } from "./steps/model-dg-config";
import { ModelQAConfig } from "./steps/model-qa-config";
import { ModelQGConfig } from "./steps/model-qg-config";

type FormWrappperProps = {
  onClose: () => void;
};

export type EvaluationInsertData = z.infer<typeof evaluationInsertScheme>;

export function EvaluationInsertForm({ onClose }: FormWrappperProps) {
  const [isLoading, setIsLoading] = useState(false);

  const evaluationInsertForm = useForm<EvaluationInsertData>({ 
    mode: "all",
    resolver: zodResolver(evaluationInsertScheme)
  })

  const { getValues } = evaluationInsertForm;

  async function handleSubmitData() {
    setIsLoading(true);

    try {
      const response = await insertEvaluationAction(getValues());
      if (!response.error) {
        toast.success(response.data);
        onClose();
      } else {
        toast.error(response.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...evaluationInsertForm}>
      <Wizard>
        <ChoiceEvaluateMetric />
        <ModelQGConfig />
        <ModelQAConfig />
        <ModelDGConfig onFinish={handleSubmitData} isLoading={isLoading} />
      </Wizard>
    </FormProvider>
  );
}
