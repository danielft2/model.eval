import { retrieveAccessToken } from "@/actions/retrieve-access-token";
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
        revalidate: 60,
      },
    }
  );

  return {
    data: response.data || [],
    error: response.error?.message || null,
  };
}
