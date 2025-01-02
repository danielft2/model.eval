export type Response<T> = {
  message: string;
  data: T;
  detail?: string;
}

export type ResponseApp<T, E> = {
  data?: T | null;
  error?: E | null;
}