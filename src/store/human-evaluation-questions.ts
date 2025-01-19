import { ImportedQuestion } from "@/features/work/human-evaluations/http/responses/human-evaluation-overview";
import { create } from "zustand";

type HumanEvaluationQuestionStore = {
  questions: ImportedQuestion[];
  setQuestions: (value: ImportedQuestion[]) => void;
};

export const useHumanEvaluationQuestionsStore =
  create<HumanEvaluationQuestionStore>((set) => ({
    questions: [],
    setQuestions: (value: ImportedQuestion[]) => {
      const uniqueQuestions = value.reduce((acc, current) => {
        if (!acc.some(item => item.descriptor_code === current.descriptor_code)) {
          acc.push(current);
        }
        return acc;
      }, [] as ImportedQuestion[]);

      return set({ questions: uniqueQuestions });
    },
  }));
