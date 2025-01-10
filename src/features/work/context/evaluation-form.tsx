import { createContext, useState } from "react";
import { AutomaticEvaluationInsert } from "@/features/work/types/automatic-evaluation-insert";  

type EvaluationFormContextData = {
  evaluationData: AutomaticEvaluationInsert;
  updateEvaluation: (evaluation: Partial<AutomaticEvaluationInsert>) => void;
}

export const EvaluationFormContext = createContext<EvaluationFormContextData>({} as EvaluationFormContextData);

type EvaluationFormContextType = {
  children: Readonly<React.ReactNode>;
}

export function EvaluationFormProvider({ children }: EvaluationFormContextType) {
  const [evaluationData, setEvaluationData] = useState<AutomaticEvaluationInsert>({} as AutomaticEvaluationInsert);

  function updateEvaluation(evaluation: Partial<AutomaticEvaluationInsert>) {
    setEvaluationData((prevEvaluation) => ({ ...prevEvaluation, ...evaluation }));
  }

  return (
    <EvaluationFormContext.Provider value={{ evaluationData, updateEvaluation }}>
      {children}
    </EvaluationFormContext.Provider>
  );
}
