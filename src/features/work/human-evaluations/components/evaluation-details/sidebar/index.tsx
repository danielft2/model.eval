"use client";

import { CircleHelp, Database } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ImportedQuestion } from "@/features/work/human-evaluations/http/responses/human-evaluation-overview";
import { retrieveHumanEvaluationOverview } from "@/features/work/human-evaluations/service/retrieve-evaluation-overview";
import { useHumanEvaluationQuestionsStore } from "@/store/human-evaluation-questions";

import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const [questions, setQuestions] = useState<ImportedQuestion[]>([]);
  const setQuestionStore = useHumanEvaluationQuestionsStore(state => state.setQuestions)
  
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathName = usePathname();
  const basePath = pathName.split("/question-overview")[0];
  
  function handleSelecteItem(value: string) {
    const newPath = value === "overview" ? basePath : `${basePath}/question-overview/${value}`;
    router.replace(newPath);
  }

  const retrieveQuestions = useCallback(async () => {
    try {
      const response = await retrieveHumanEvaluationOverview(id);
      if (response.data) {
        setQuestions(response.data.imported_questions);
        setQuestionStore(response.data.imported_questions);
      };
    } finally {}
  }, [id, setQuestionStore]);

  useEffect(() => {
    retrieveQuestions();
  }, [retrieveQuestions]);

  return (
    <ScrollArea style={{ height: "calc(100vh - 180px)" }}>
      <aside
        className="w-64 pr-5 py-6 border-r h-full border-slate-300 space-y-4"
      >
        <SidebarItem
          valueItem="overview"
          activeItem={!pathName.includes("question-overview")}
          onClickItem={handleSelecteItem}
        >
          <Database />
          Informações Gerais
        </SidebarItem>

        <div className="space-y-1">
          <span className="font-heading text-xs font-medium text-slate-600">
            DESCRITORES
          </span>
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <li key={question.id}>
                <SidebarItem
                  valueItem={question.id}
                  activeItem={pathName.includes(`question-overview/${question.id}`)}
                  onClickItem={handleSelecteItem}
                >
                  <CircleHelp />
                  Questão {index} {question.descriptor_code}
                </SidebarItem>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </ScrollArea>
  );
}
