"use client";

import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";

import { getEvaluationFormAction } from "@/features/form/actions/get-evaluation-form";
import { EvaluationFormResponse } from "@/features/form/http/responses/evaluation-form";

import { ConceptsStep } from "./steps/concepts-step";
import { FinishStep } from "./steps/finish-step";
import { FormQuestions } from "./steps/form-questions";
import { WelcomeStep } from "./steps/welcome-step";

export function FormEvaluationWizard() {
  const [isLoading, setIsLoading] = useState(true);
  const [evaluationForm, setEvaluationForm] =
    useState<EvaluationFormResponse | null>(null);

  const { key } = useParams<{ key: string }>();
  const getEvaluationForm = useCallback(async () => {
    setIsLoading(true);
    const response = await getEvaluationFormAction(key);
    if (response.data) setEvaluationForm(response.data);
    setIsLoading(false);
  }, [key]);

  useEffect(() => {
    getEvaluationForm();
  }, [getEvaluationForm]);

  const metricsUsed = {
    use_relevance: evaluationForm?.evaluation?.use_relevance || false,
    use_answerability: evaluationForm?.evaluation?.use_answerability || false,
    use_utility: evaluationForm?.evaluation?.use_utility || false,
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-brand-700" size={32}/>
      </div>
    );

  return (
    <Wizard>
      <WelcomeStep
        instructions={evaluationForm?.evaluation?.instructions || ""}
      />
      <ConceptsStep metricsUsed={metricsUsed} />
      <FormQuestions
        metricsUsed={metricsUsed}
        questions={evaluationForm?.questions || []}
      />
      <FinishStep />
    </Wizard>
  );
}
