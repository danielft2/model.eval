import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationDetails } from "@/features/work/types/automatic-evaluation-details";

export async function retrieveAutomaticEvaluationDetails(evaluationId: string): Promise<
  ResponseApp<AutomaticEvaluationDetails, string>
> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.GET<AutomaticEvaluationDetails>(
    `/automatic-evaluation/${evaluationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    data: response.data || null,
    error: response.error?.message || null,
  };
}
