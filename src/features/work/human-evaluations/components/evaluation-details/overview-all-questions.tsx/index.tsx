"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Content } from "./content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";

export function OverviewAllQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const descriptorCode = searchParams.get('descriptor_code');

  const questionsDecriptors = useHumanEvaluationDetailsStore(
    (state) => state.questions
  );

  function handleChangedDescriptor(descriptorCode: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('descriptor_code', descriptorCode);
    router.push(`${pathname}?${params.toString()}`);
  } 

  return (
    <div className="space-y-4">
      <Select value={descriptorCode || '0'} onValueChange={handleChangedDescriptor}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Descritor" className="text-slate-600" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Todos os descritores</SelectItem>
          {questionsDecriptors.map((question) => (
            <SelectItem
              key={question.id}
              value={question.descriptor_code}
            >
              {question.descriptor_code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Content />
    </div>
  );
}
