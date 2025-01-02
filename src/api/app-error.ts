export class AppError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
