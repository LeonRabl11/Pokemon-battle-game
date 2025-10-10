import type { Request, Response, NextFunction } from 'express';

type HttpError = {
  message?: string;
  status?: number;
  statusCode?: number;
};

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  const httpErr = (err ?? {}) as HttpError;
  const status = httpErr.status ?? httpErr.statusCode ?? 500;

  const message =
    err instanceof Error ? err.message || 'Internal Server Error' : 'Internal Server Error';

  res.status(status).json({ message });
}
