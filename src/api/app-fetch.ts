import { AppError } from "./app-error";

export class AppFetch {
  private static baseUrl = "http://127.0.0.1:8000/";

  static async GET<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async POST<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(body),
      ...options
    });

    const response_data = await response.json();
    
    if (!response.ok) {
      if (response_data.detail)
        throw new AppError(response_data.detail, response.status);
    }

    return response_data;
  }
}