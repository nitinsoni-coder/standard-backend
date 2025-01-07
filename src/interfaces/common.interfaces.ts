export declare interface ResponseObject {
  success: boolean;
  message: string;
  request?: {
    ip?: string | null;
    method: string;
    url: string;
  };
  data?: unknown;
  error?: unknown;
}

export interface IEnvConfig {
  PORT: string | undefined;
  NODE_ENV: "staging" | "production" | "development";
  MONGO_URL: string | undefined;
}

export interface IHttpError {
  success: boolean;
  message: string;
  request?: {
    ip?: string | null;
    method: string;
    url: string;
  };
  data?: unknown;
  trace?: object | null;
}
