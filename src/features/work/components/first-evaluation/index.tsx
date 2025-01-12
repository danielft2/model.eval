"use client";

import Image from "next/image";
import { useState } from "react";

import { EvaluationInsertModal } from "@/features/work/automatic-evaluations/components/evaluation-insert";

export function FirstEvaluation() {
  const [automaticEvaluationIsOpen, setAutomaticEvaluationIsOpen] =
    useState(false);

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Image src={"/logo.svg"} width={48} height={48} alt="logo" />
          <div className="text-center">
            <h1 className="text-xl text-slate-900 font-heading font-medium -tracking-wider">
              Crie a sua primeira avaliação
            </h1>
            <p className="font-body font-medium text-slate-600 text-[15px]">
              Escolha abaixo que tipo de avaliação você deseja realizar
            </p>
          </div>
        </div>

        <div className="flex w-[800px] space-x-5">
          <button 
            className="hover:border-brand-700 hover:bg-brand-50/40 transition-colors h-60 flex flex-col 
            space-y-5 cursor-pointer justify-center items-center flex-1 bg-slate-50 border border-slate-300 rounded-xl px-5 py-6"
            onClick={() => setAutomaticEvaluationIsOpen(true)}
          >
            <Image
              src={"/evaluation-automatic.svg"}
              width={110}
              height={110}
              alt="avaliação automática"
            />
            <div className="text-center">
              <h1 className="font-medium font-heading -tracking-wider text-slate-900">
                Avaliação Automática
              </h1>
              <p className="font-medium font-body text-slate-600 text-sm max-w-[40ch]">
                Avalie seu modelo com métricas automáticas e confira os
                resultados na hora.
              </p>
            </div>
          </button>

          <button className="hover:border-brand-700 hover:bg-brand-50/40 transition-colors h-60 flex flex-col space-y-5 cursor-pointer justify-center items-center flex-1 bg-slate-50 border border-slate-300 rounded-xl px-5 py-6">
            <Image
              src={"/evaluation-human.svg"}
              width={110}
              height={110}
              alt="avaliação humana"
            />
            <div className="text-center">
              <h1 className="font-medium font-heading -tracking-wider text-slate-900">
                Avaliação Humana
              </h1>
              <p className="font-medium font-body text-slate-600 text-sm max-w-[40ch]">
                Crie uma avaliação para avaliar seu modelo com métricas humanas.
              </p>
            </div>
          </button>
        </div>
      </div>

      <EvaluationInsertModal
        isOpen={automaticEvaluationIsOpen}
        setIsOpen={setAutomaticEvaluationIsOpen}
      />
    </>
  );
}
