import { FileSpreadsheet } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EvaluationInsertData } from "@/features/work/automatic-evaluations/schemes/evalution-insert";
import { ErrorField } from "@/components/ui/error-field";

export function ModelQGConfig() {
  const { previousStep, nextStep } = useWizard();

  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<EvaluationInsertData>();

  async function handleNextStep() {
    const isValid = await trigger(["model_qg"]);
    if (!isValid) return;

    const data = getValues();
    setValue("model_qg", data.model_qg);
    nextStep();
  }

  const modelIdErrorMessage = errors.model_qg?.model_title_id?.message;
  const inputTextErrorMessage = errors.model_qg?.model_title_id?.message;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-7">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-brand-700 rounded-full flex items-center justify-center">
              <FileSpreadsheet className="text-white" size={16} />
            </div>

            <div className="">
              <h2 className="text-slate-800 font-heading font-medium -tracking-wider">
                Tarefa de Geração de Perguntas
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
            <Input
              id="model_id"
              type="text"
              className={modelIdErrorMessage && "invalid-field"}
              {...register("model_qg.model_title_id")}
            />
            <ErrorField message={modelIdErrorMessage} />
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
              placeholder="Exemplo: Write a question about the following article: {descritor}, {texto}\n\nQuestion about the article:"
              rows={2}
              className={inputTextErrorMessage && "invalid-field"}
              {...register("model_qg.input_text")}
            />
            <ErrorField message={inputTextErrorMessage} />
          </div>
        </form>
      </div>

      <div className="mt-[25px] flex gap-2 justify-end">
        <Button
          variant="secondary"
          className="min-w-[100px]"
          onClick={() => previousStep()}
        >
          Voltar
        </Button>
        <Button className="min-w-[100px]" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
