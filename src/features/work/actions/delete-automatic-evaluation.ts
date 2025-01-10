"use server"

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { revalidateTag } from "next/cache";

export async function deleteAutomaticEvaluation(evaluationId: number): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.DELET(`/automatic-evaluation/${evaluationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  revalidateTag("automatic-evaluations");

  return {
    data: response?.message || "",
    error: response?.error?.message || ""
  }
}