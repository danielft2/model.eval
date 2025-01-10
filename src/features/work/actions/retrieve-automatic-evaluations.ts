import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { verifyResponse } from "@/actions/verify-response";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluation } from "@/features/work/types/automatic-evaluation";

export async function retrieveAutomaticEvaluationsAction(): Promise<
  ResponseApp<AutomaticEvaluation[], string>
> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.GET<AutomaticEvaluation[]>(
    "/automatic-evaluation",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["automatic-evaluations"],
      },
    }
  );

  await verifyResponse(response);

  return {
    data: response.data || [],
    error: response.error?.message || null,
  };
}
