'use server'

import { ResponseApp } from "@/api/response";
import { checkHasEvaluations } from "@/features/work/api/has-check-evaluations";

export async function checkHasEvaluationsAction(): Promise<ResponseApp<boolean, string>> {
  const hasEvaluations = await checkHasEvaluations();
  return hasEvaluations;
}