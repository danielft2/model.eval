import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { EvaluationInsertForm } from "./evaluation-insert-form";

type EvaluationModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function EvaluationInsertModal({
  isOpen,
  setIsOpen,
}: EvaluationModalProps) {

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/30 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 min-h-[70vh] w-[90vw] max-w-[1000px] -translate-x-1/2 
          -translate-y-1/2 rounded-lg bg-white p-[25px] shadow-sm focus:outline-none data-[state=open]:animate-contentShow"
        >
          <Dialog.Title className="flex justify-between items-center text-slate-900 border-b border-slate-300 pb-4 mb-6">
            <span className="font-medium font-heading -tracking-wider text-lg">
              Avaliação Automática
            </span>
            <Dialog.Close asChild>
              <button>
                <X size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          
          <EvaluationInsertForm onClose={() => setIsOpen(false)}/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
