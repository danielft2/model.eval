import { AppError } from "@/api/app-error";
import { Response, ResponseApp } from "@/api/response";

export async function signin(
  email: string
): Promise<ResponseApp<string, string>> {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const response_data = (await response.json()) as Response<string>;

    if (!response.ok) {
      if (response_data.detail)
        throw new AppError(response_data.detail, response.status);
    }

    return { data: response_data.data, error: null };
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
