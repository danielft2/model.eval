import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { AppError } from "@/api/app-error";
import { Response, ResponseApp } from "@/api/response";
import { AutomaticEvaluation } from "@/features/work/types/automatic-evaluation";

export async function retrieveAutomaticEvaluationsAction(): Promise<
  ResponseApp<AutomaticEvaluation[], string>
> {
  const token = await retrieveAccessToken();

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/automatic-evaluation`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60
        }
      }
    );

    if (!response.ok) {
      throw new AppError(
        "Ocorreu um erro inesperado, tente novamente em breve.",
        response.status
      );
    }

    const response_data: Response<AutomaticEvaluation[]> =
      await response.json();

    return { data: response_data.data, error: null };
  } catch (error) {
    if (error instanceof AppError) {
      return { data: null, error: error.message };
    } else {
      return {
        data: [],
        error: "Ocorreu um erro inesperado, tente novamente em breve.",
      };
    }
  }
}
