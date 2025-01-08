import { ResponseHttp } from "./response"

export type RequestOptions = RequestInit & {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export interface HttpClient {
  GET<T = unknown>(endpoint: string, options?: RequestOptions): Promise<ResponseHttp<T>> 
  POST<T = unknown>(endpoint: string, body: unknown, options?: RequestOptions): Promise<ResponseHttp<T>> 
}