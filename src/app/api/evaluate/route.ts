import { fetchClient } from '@/api/fetch-client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type Body = {
  modelId: number;
  evaluationId: string;
}

export async function PUT(request: Request) {
  const token = (await cookies()).get('token')?.value;
  const { modelId, evaluationId } = await request.json() as Body;
  console.log(evaluationId)

  const response = await fetchClient.PUT(`/evaluate-model/${modelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json({
    data: response.data || null,
    error: response.error?.message || null,
  })
}