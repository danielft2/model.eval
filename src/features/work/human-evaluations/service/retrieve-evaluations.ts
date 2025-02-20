import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import {
  iHumanEvaluationResponse,
  iHumanEvaluationResponseToHumanEvaluationCard,
} from "@/features/work/human-evaluations/http/responses/get-evaluations-response";

import { tHumanEvaluationCard } from "../core/types/human-evaluation-card";

export async function retieveHumanEvaluations(): Promise<
  ResponseApp<tHumanEvaluationCard[], string>
> {
  const token = await retrieveAccessToken();

  const response = await fetchClient.request<iHumanEvaluationResponse[]>({
    method: "GET",
    endpoint: "/human-evaluation",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [REVALIDATE_TAGS.HUMAN_EVALUATIONS],
      },
    },
  });

  return {
    data:
      response.data?.map(iHumanEvaluationResponseToHumanEvaluationCard) || [],
    error: response.error?.message || null,
  };
}
