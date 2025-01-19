"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, Link2 } from "lucide-react";
import Link from "next/link";

export function HumanEvaluationDetailsHeader() {
  return (
    <>
      <header className="flex justify-between items-center h-20">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <Link href={"/workspace/work"}>Avaliações</Link>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              Avaliação google/flan-t5-base{" "}
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>
        </div>

        <div className="space-x-2">
          <Button variant="secondary">
            <ArrowUpFromLine />
            Questões
          </Button>

          <Button>
            <Link2 />
            Compartilhar
          </Button>
        </div>
      </header>
    </>
  );
}
