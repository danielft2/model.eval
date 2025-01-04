import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { AppError } from "@/api/app-error";
import { ResponseApp } from "@/api/response";

export async function checkHasEvaluations(): Promise<ResponseApp<boolean, string>> {
  const token = await retrieveAccessToken();

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/has-evaluations`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    });

    const response_data = (await response.json());

    if (!response.ok) {
      throw new AppError("Ocorreu um erro inesperado, tente novamente em breve.", response.status);
    }

    return { data: response_data.has_evaluations, error: null };
  } catch (error) {
    if (error instanceof AppError) {
      return { data: null, error: error.message };
    } else {
      return {
        data: null,
        error: "Ocorreu um erro inesperado, tente novamente em breve.",
      };
    }
  }
}
