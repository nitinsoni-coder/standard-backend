class CustomError extends Error {
  public statusCode: number;
  public message: string;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
