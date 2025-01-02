export interface SigninData {
  message: string;
}

export interface SigninError {
  message?: string | null;
  validations?: Record<string, string[]>;
}