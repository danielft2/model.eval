"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";

export async function checkHasEvaluationsAction(): Promise<
  ResponseApp<boolean, string>
> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.GET<{ has_evaluations: boolean }>(
    "/evaluations/has-evaluations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { data, error } = response;

  return {
    data: data?.has_evaluations ?? null,
    error: error?.message ?? null,
  };
}
