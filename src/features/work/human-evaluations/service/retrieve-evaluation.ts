import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { verifyResponse } from "@/actions/verify-response";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { HumanEvaluationDetails } from "../http/responses/human-evaluation-details";

export async function retrieveHumanEvaluation(evaluationId: string): Promise<ResponseApp<HumanEvaluationDetails, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request<HumanEvaluationDetails>({
    method: "GET",
    endpoint: `/human-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  }
}