import { retrieveAccessToken } from '@/actions/retrieve-access-token';
import { fetchClient } from '@/api/fetch-client';
import { verifyResponse } from '@/api/verify-response';
import { NextResponse } from 'next/server';

type Body = {
  modelId: number;
  evaluationId: string;
}

export async function PUT(request: Request) {
  const token = retrieveAccessToken();
  const { modelId } = await request.json() as Body;

  const response = await fetchClient.request({
    method: 'PUT',
    endpoint: `/models/${modelId}/evaluate`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  }) 

  await verifyResponse(response)

  return NextResponse.json({
    data: response?.data || null,
    error: response?.error?.message || null,
  })
}