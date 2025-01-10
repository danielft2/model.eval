"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationInsert } from "@/features/work/types/automatic-evaluation-insert";
import { revalidateTag } from "next/cache";

export async function insertAutomaticEvaluationAction(
  data: AutomaticEvaluationInsert
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.POST("/automatic-evaluation", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.error) {
    revalidateTag("automatic-evaluations");
  }

  return {
    data: response?.message || "",
    error: response?.error?.message || "",
  };
}
