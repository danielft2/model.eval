import { HumanEvaluationDetails } from "@/features/work/human-evaluations/http/responses/human-evaluation-details";
import { HumanEvaluationOverview, ImportedQuestion } from "@/features/work/human-evaluations/http/responses/human-evaluation-overview";
import { create } from "zustand";

type HumanEvaluationDetailsStore = {
  evaluation: HumanEvaluationDetails | null;
  questions: ImportedQuestion[];
  setDataOverview: (value: HumanEvaluationOverview) => void;
};

export const useHumanEvaluationDetailsStore =
  create<HumanEvaluationDetailsStore>((set, get) => ({
    evaluation: null,
    questions: [],
    setDataOverview: (value: Partial<HumanEvaluationOverview>) => {
      return set({ 
        evaluation: value.evaluation, 
        questions: value.imported_questions ?? get().questions
      });
    },
  }));
