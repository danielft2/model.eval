import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EvaluationFormContext } from "@/features/work/context/evaluation-form";
import {
  ModelConfig,
  modelConfigScheme,
} from "@/features/work/schemes/model-config";
import { AutomaticEvaluationInsert } from "@/features/work/types/automatic-evaluation-insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileSpreadsheet } from "lucide-react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";

type ModelDGConfigProps = {
  onFinish: (data: AutomaticEvaluationInsert) => void;
  isLoading: boolean;
};

export function ModelDGConfig({ onFinish, isLoading }: ModelDGConfigProps) {
  const { previousStep } = useWizard();

  const { updateEvaluation, evaluationData } = use(EvaluationFormContext);
  const modelData = evaluationData.model_dg || {};

  const { register, handleSubmit } = useForm<ModelConfig>({
    resolver: zodResolver(modelConfigScheme),
    defaultValues: modelData,
  });

  async function handleNextStep(data: ModelConfig) {
    let evaluation = { ...evaluationData };

    if (data.model_title_id && data.input_text) {
      updateEvaluation({ model_qg: data });
      evaluation = { ...evaluationData, model_dg: data };
    }

    onFinish(evaluation);
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
                Tarefa de Geração de Distratores
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
            <Input id="model_id" type="text" {...register("model_title_id")} />
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
              placeholder="Exemplo: “What would be incorrect answers to the question?\n\n{texto}\n\nQuestion: 
                {question}\n\nResponse: {answer}”
              "
              rows={2}
              {...register("input_text")}
            />
          </div>
        </form>
      </div>

      <div className="mt-[25px] flex gap-2 justify-end">
        <Button
          variant="secondary"
          onClick={() => previousStep()}
          disabled={isLoading}
        >
          Anterior
        </Button>
        <Button onClick={handleSubmit(handleNextStep)} disabled={isLoading}>
          Finalizar
        </Button>
      </div>
    </>
  );
}
