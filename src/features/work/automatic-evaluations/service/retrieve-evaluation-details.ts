import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { verifyResponse } from "@/actions/verify-response";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationDetailsResponse } from "../http/responses/automatic-evaluation-details";

export async function retrieveEvaluationDetails(
  evaluationId: string
): Promise<ResponseApp<AutomaticEvaluationDetailsResponse, string>> {
  const token = await retrieveAccessToken();
  const response =
    await fetchClient.request<AutomaticEvaluationDetailsResponse>({
      method: "GET",
      endpoint: `/automatic-evaluation/${evaluationId}`,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["evaluation-details"],
        },
      },
    });

  await verifyResponse(response);

  return {
    data: response?.data || null,
    error: response?.error?.message || null,
  };
}
