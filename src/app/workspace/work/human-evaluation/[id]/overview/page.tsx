import { ScrollArea } from "@/components/ui/scroll-area";
import { OverviewAllQuestions } from "@/features/work/human-evaluations/components/evaluation-details/overview-all-questions.tsx";

export default async function OverviewPage() {
  return (
    <ScrollArea className="flex-1 pt-6" style={{ height: "calc(100vh - 188px)" }}>
      <OverviewAllQuestions />
    </ScrollArea>
  );
}
