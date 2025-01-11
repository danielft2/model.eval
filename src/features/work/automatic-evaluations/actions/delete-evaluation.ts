"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { revalidateTag } from "next/cache";

export async function deleteEvaluationAction(
  evaluationId: number
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request({
    method: "DELETE",
    endpoint: `/automatic-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (response.data) revalidateTag("automatic-evaluations");

  return {
    data: response?.message || "",
    error: response?.error?.message || "",
  };
}
