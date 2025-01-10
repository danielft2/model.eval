'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAutomaticEvaluation } from "@/features/work/actions/delete-automatic-evaluation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

type AutomaticEvaluationCardOptionsProps = {
  evaluationId: number
};

export function AutomaticEvaluationCardOptions({ evaluationId }: AutomaticEvaluationCardOptionsProps) {
  async function handleDeleteEvaluation() {
    try {
      toast.promise(deleteAutomaticEvaluation(evaluationId), {
        loading: 'Deletando...',
        success: (response) => {
          return response.data ?? response.error;   
        },
      });
    } finally {
    }
  }

  return (
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
        <DropdownMenuItem>
          <Edit />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-700" onClick={handleDeleteEvaluation}>
          <Trash /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
