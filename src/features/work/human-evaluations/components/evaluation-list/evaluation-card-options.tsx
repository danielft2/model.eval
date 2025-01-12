'use client'
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EvaluationInsertModal } from "@/features/work/automatic-evaluations/components/evaluation-insert";
import { deleteHumanEvaluationAction } from "@/features/work/human-evaluations/actions/delete-evaluation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoadingStore } from "@/store/loading-store";

type AutomaticEvaluationCardOptionsProps = {
  evaluationId: string
};

export function HumanEvaluationCardOptions({ evaluationId }: AutomaticEvaluationCardOptionsProps) {
  const changeLoadingState = useLoadingStore(state => state.changeLoadingState)

  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  async function handleDeleteEvaluation() {
    try {
      changeLoadingState(true)
      const response = await deleteHumanEvaluationAction(evaluationId)

      if (response.data) toast.success(response.data);
      else toast.error(response.error);
    } finally {
      changeLoadingState(false)
    }
  }

  function handleEditEvaluation() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit', evaluationId.toString());
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 text-slate-600"
          >
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleEditEvaluation}>
            <Edit />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-700" onClick={handleDeleteEvaluation}>
            <Trash /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EvaluationInsertModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
