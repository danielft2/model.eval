import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { EvaluationFormContext } from "@/features/work/context/evaluation-form";
import { ModelConfig, modelConfigScheme } from "@/features/work/schemes/model-config";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileSpreadsheet } from "lucide-react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";

export function ModelQAConfig() {
  const { previousStep, nextStep } = useWizard();

  const { updateEvaluation, evaluationData } = use(EvaluationFormContext);
    const modelQGData = evaluationData.model_qa || {};
  
    const {
      register,
      handleSubmit,
    } = useForm<ModelConfig>({
      mode: "onBlur",
      resolver: zodResolver(modelConfigScheme),
      defaultValues: modelQGData,
    });
  
    function handleNextStep(data: ModelConfig) {
      if (data.model_title_id && data.input_text) {
        updateEvaluation({ model_qa: data });
      }
      nextStep();
    }

  return (
    <>
      <div className="space-y-7">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-brand-700 rounded-full flex items-center justify-center">
              <FileSpreadsheet className="text-white" size={16} />
            </div>

            <div className="">
              <h2 className="text-slate-800 font-heading font-medium -tracking-wider">
                Tarefa de Resposta a Pergunta
              </h2>
              <p className="text-slate-600 font-body font-medium text-sm">
                Defina o modelo que será avaliado nessa tarefa.
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-1 flex-grow">
            <label
              htmlFor="model_id"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Modelo (HugginfaceID)
            </label>
            <Input id="model_id" type="text" {...register('model_title_id')} />
          </div>

          <div className="space-y-1 flex-grow">
            <label
              htmlFor="input_text"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Input text
            </label>
            <Textarea
              id="input_text"
              placeholder="Exemplo: “{texto}\n\nAnswer this question based on the article: {comando}”"
              rows={2}
              {...register('input_text')}
            />
          </div>
        </form>
      </div>

      <div className="mt-[25px] flex gap-2 justify-end">
        <Button variant="secondary" onClick={() => previousStep()}>
          Anterior
        </Button>
        <Button onClick={handleSubmit(handleNextStep)}>Continuar</Button>
      </div>
    </>
  );
}
