import { HttpClient, RequestOptions } from "@/infra/http/http-client";
import { ResponseHttp } from "@/infra/http/response";
import { AppError } from "./app-error";

export class AppFetch implements HttpClient {
  private baseUrl = process.env.API_BASE_URL;

  public async GET<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseHttp<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = this.buildRequestConfig("GET", options);

    try {
      const response = await fetch(url, config);
      const data: ResponseHttp<T> = await response.json();
      
      this.verifyResponse(response, data);

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async POST<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseHttp<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = this.buildRequestConfig("POST", options);

    try {
      const response = await fetch(url, config);
      const data: ResponseHttp<T> = await response.json();
      
      this.verifyResponse<T>(response, data);
      
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async POST_T<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseHttp<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      method: 'POST',
      headers: {
        ...options?.headers,
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data: ResponseHttp<T> = await response.json();
      
      this.verifyResponse<T>(response, data);
      
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async PUT<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseHttp<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = this.buildRequestConfig("PUT", options);

    try {
      const response = await fetch(url, config);
      const data: ResponseHttp<T> = await response.json();
      
      this.verifyResponse<T>(response, data);
      
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private verifyResponse<T>(response: Response, data: ResponseHttp<T>): void {
    if (!response.ok) {
      throw new AppError(
        response.status,
        data?.error?.message || "Ocorreu um erro inesperado, tente novamente!",
        data?.error?.type,
        data?.error?.validations || {}
      );
    }
  }

  private handleError<T = unknown>(error: unknown): ResponseHttp<T> {
    console.log(error)
    if (error instanceof AppError) {
      return error.toResponseHttp<T>();
    }

    return {
      error: {
        type: "error",
        message: "Ocorreu um erro inesperado, tente novamente!",
      },
      status_code: 500,
    };
  }

  private buildRequestConfig(method: string, options?: RequestOptions): RequestInit {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    };
  }
}

export const fetchClient = new AppFetch();