// src/utils/token.ts
import jwt, { type JwtPayload, type SignOptions, type Secret } from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/index.ts';

const SECRET: Secret = JWT_SECRET as Secret;
const ACCESS_TTL: SignOptions['expiresIn'] = JWT_EXPIRES_IN as SignOptions['expiresIn'];

type AccessPayload = JwtPayload & { sub: string; email: string };

export function signAccessToken(userId: string, email: string): string {
  const payload: AccessPayload = { sub: userId, email };
  const options: SignOptions = { expiresIn: ACCESS_TTL };
  return jwt.sign(payload, SECRET, options);
}

export function verifyAccessToken(token: string): { sub: string; email: string } {
  const decoded = jwt.verify(token, SECRET) as AccessPayload;
  return { sub: String(decoded.sub), email: String(decoded.email) };
}

export function generateRefreshTokenRaw(): string {
  // 64 bytes random → base64url
  return crypto.randomBytes(64).toString('base64url');
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
