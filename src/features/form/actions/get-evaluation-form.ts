"use server"

import { fetchClient } from "@/api/fetch-client";
import { verifyResponse } from "@/api/verify-response";
import { EvaluationFormResponse } from "../http/responses/evaluation-form";
import { ResponseApp } from "@/api/response";

export async function getEvaluationFormAction(key: string): Promise<ResponseApp<EvaluationFormResponse, string>> {
  const response = await fetchClient.request<EvaluationFormResponse>({
    method: "GET",
    endpoint: "/evaluations/evaluate-questions",
    options: {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  })

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  }
}