"use client";

import { insertEvaluationAction } from "@/features/work/automatic-evaluations/actions/insert-evaluation";
import { EvaluationFormProvider } from "@/features/work/automatic-evaluations/context/evaluation-insert-form";
import { AutomaticEvaluationInsertDto } from "@/features/work/automatic-evaluations/http/dtos/automatic-evaluation-insert";

import { useState } from "react";
import { Wizard } from "react-use-wizard";
import { toast } from "sonner";

import { ChoiceEvaluateMetric } from "./steps/choice-evaluate-metric";
import { ModelDGConfig } from "./steps/model-dg-config";
import { ModelQAConfig } from "./steps/model-qa-config";
import { ModelQGConfig } from "./steps/model-qg-config";

type FormWrappperProps = {
  onClose: () => void;
};

export function EvaluationInsertForm({ onClose }: FormWrappperProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitData(data: AutomaticEvaluationInsertDto) {
    setIsLoading(true);

    try {
      const response = await insertEvaluationAction(data);
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
    <EvaluationFormProvider>
      <Wizard>
        <ChoiceEvaluateMetric />
        <ModelQGConfig />
        <ModelQAConfig />
        <ModelDGConfig onFinish={handleSubmitData} isLoading={isLoading} />
      </Wizard>
    </EvaluationFormProvider>
  );
}
