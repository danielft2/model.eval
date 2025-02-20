"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";

import { LoadingFullScreen } from "@/components/loading/loading-full-screen";
import { getEvaluationFormAction } from "@/features/form/actions/get-evaluation-form";
import { ErrorScreenForm } from "@/features/form/components/error-screen-form";
import { EvaluationFormResponse } from "@/features/form/http/responses/evaluation-form";

import { ConceptsStep } from "./steps/concepts-step";
import { FinishStep } from "./steps/finish-step";
import { FormQuestions } from "./steps/form-questions";
import { WelcomeStep } from "./steps/welcome-step";

export function FormEvaluationWizard() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null);

  const [evaluationForm, setEvaluationForm] =
    useState<EvaluationFormResponse | null>(null);

  const { key } = useParams<{ key: string }>();
  const getEvaluationForm = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getEvaluationFormAction(key);
      if (response.data) setEvaluationForm(response.data);
      if (response.error) setErrorStatusCode(response.error.status);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    getEvaluationForm();
  }, [getEvaluationForm]);

  const metricsUsed = {
    useRelevance: evaluationForm?.evaluation?.useRelevance || false,
    useAnswerability: evaluationForm?.evaluation?.useAnswerability || false,
    useUtility: evaluationForm?.evaluation?.useUtility || false,
  };

  if (isLoading) return <LoadingFullScreen />
  if (errorStatusCode) return <ErrorScreenForm errorStatusCode={errorStatusCode} />;
  
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
