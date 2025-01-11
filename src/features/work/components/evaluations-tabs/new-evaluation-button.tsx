'use client'

import { Button } from "@/components/ui/button";
import { EvaluationInsertModal } from "@/features/work/automatic-evaluations/components/evaluation-insert";
import { ListVideo } from "lucide-react";
import { useState } from "react";

export function NewEvaluationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" className="gap-1" onClick={() => setIsOpen(true)}>
        <ListVideo />
        Nova avaliação
      </Button>

      <EvaluationInsertModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
