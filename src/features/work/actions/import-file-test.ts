"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";

export async function importFileTestAction(
  evaluationId: string,
  form: FormData
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.POST<{ file_name_id: string }>(
    `/automatic-evaluation/${evaluationId}/import-file-test`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "multipart/form-data",
      },
      body: form,
    }
  );

  return {
    data: response.message || '',
    error: response.error?.message || ''
  };
}
