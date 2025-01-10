'use client'

import { Button } from "@/components/ui/button";
import { EvaluationModal } from "@/features/work/components/evaluation-modal";
import { ListVideo } from "lucide-react";
import { useState } from "react";

export function NewEvaluation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" className="gap-1" onClick={() => setIsOpen(true)}>
        <ListVideo />
        Nova avaliação
      </Button>

      <EvaluationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
