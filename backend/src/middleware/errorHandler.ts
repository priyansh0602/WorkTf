import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

interface HttpError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response: Record<string, unknown> = { error: message };

  if (config.clientUrl.includes('localhost')) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export function createError(message: string, statusCode: number): HttpError {
  const err: HttpError = new Error(message);
  err.statusCode = statusCode;
  return err;
}
