"use client";

import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DialogClose } from "@radix-ui/react-dialog";
import { FileSpreadsheet, Info } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { EvaluationInsertData } from "@/features/work/automatic-evaluations/components/evaluation-insert/evaluation-insert-form";
import { ErrorField } from "@/components/ui/error-field";
import clsx from "clsx";

type ChoiceEvaluateMetricData = Pick<
  EvaluationInsertData,
  "metric_id" | "title"
>;

export function ChoiceEvaluateMetric() {
  const { nextStep } = useWizard();
  const {
    register,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<ChoiceEvaluateMetricData>();

  async function handleNextStep() {
    const isValid = await trigger(["metric_id", "title"]);
    if (!isValid) return;

    const data = getValues();
    setValue("metric_id", data.metric_id, { shouldValidate: true });
    setValue("title", data.title, { shouldValidate: true });
    nextStep();
  }

  const titleErrorMessage = errors.title?.message;
  const metricErrorMessage = errors.metric_id?.message;

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
                Escolha a métrica de avaliação
              </h2>
              <p className="text-slate-600 font-body font-medium text-sm">
                Escolha a métrica de avalição automática no qual o modelo vai
                ser avaliado.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg space-y-1">
          <div className="flex items-center gap-1">
            <Info size={16} />
            <h3 className="font-heading text-sm text-slate-800 -tracking-wider font-medium">
              Perplexidade
            </h3>
          </div>
          <p className="text-slate-700 font-body font-medium text-[13px]">
            A métrica perplexidade mede o quão previsível um texto é por um
            modelo de linguagem (LM) e é frequentemente usada para avaliar a
            fluência ou naturalidade do texto (quanto menor a perplexidade, mais
            fluente ou natural o texto é).
          </p>
        </div>

        <Divider />

        <form className="flex gap-4">
          <div className="space-y-1 flex-1">
            <label
              htmlFor="titulo_avaliacao"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Título da avaliação
            </label>
            <Input
              id="titulo_avaliacao"
              type="text"
              className={clsx("", titleErrorMessage && "invalid-field")}
              {...register("title")}
            />
            <ErrorField message={titleErrorMessage} />
          </div>

          <div className="space-y-1 flex-1">
            <label
              htmlFor="metrica"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Métrica de avaliação
            </label>
            <Controller
              name="metric_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={onChange}
                  value={value?.toString() || ""}
                >
                  <SelectTrigger
                    className={clsx(
                      "w-full",
                      metricErrorMessage && "invalid-field"
                    )}
                  >
                    <SelectValue
                      placeholder="Escolha uma métrica"
                      className="text-slate-600"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Perplexidade</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <ErrorField message={metricErrorMessage} />
          </div>
        </form>
      </div>

      <div className="mt-[25px] flex gap-2 justify-end">
        <DialogClose asChild>
          <Button variant="secondary" className="min-w-[100px]" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="min-w-[100px]"
          onClick={handleNextStep}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
