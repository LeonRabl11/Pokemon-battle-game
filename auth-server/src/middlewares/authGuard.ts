import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token.ts';

export type AuthedRequest = Request & { user?: { id: string; email: string } };

export function authGuard(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing/invalid Authorization header' });
  }
  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
