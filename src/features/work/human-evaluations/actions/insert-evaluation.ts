"use server";
import { revalidateTag } from "next/cache";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { verifyResponse } from "@/actions/verify-response";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { HumanEvaluationInsertDto } from "@/features/work/human-evaluations/http/dtos/human-evaluation-insert";

export async function insertHumanEvaluationAction(
  data: HumanEvaluationInsertDto
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request({
    endpoint: "/human-evaluation",
    method: "POST",
    body: data,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  await verifyResponse(response);
  if (response.data) revalidateTag(REVALIDATE_TAGS.HUMAN_EVALUATIONS);

  return {
    data: response.message || "",
    error: response.error?.message || "",
  };
}
