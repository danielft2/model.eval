"use client";

import { insertAutomaticEvaluationAction } from "@/features/work/actions/insert-automatic-evaluation";
import { EvaluationFormProvider } from "@/features/work/context/evaluation-form";
import { AutomaticEvaluationInsert } from "@/features/work/types/automatic-evaluation-insert";

import { useState } from "react";
import { Wizard } from "react-use-wizard";
import { toast } from "sonner";

import { ChoiceEvaluateMetric } from "./choice-evaluate-metric";
import { ModelDGConfig } from "./model-dg-config";
import { ModelQAConfig } from "./model-qa-config";
import { ModelQGConfig } from "./model-qg-config";

type FormWrappperProps = {
  onClose: () => void;
};

export function FormWrapper({ onClose }: FormWrappperProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitData(data: AutomaticEvaluationInsert) {
    setIsLoading(true);

    try {
      const response = await insertAutomaticEvaluationAction(data);
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
