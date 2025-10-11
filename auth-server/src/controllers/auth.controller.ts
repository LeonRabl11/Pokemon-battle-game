// src/controllers/auth.controller.ts
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, RefreshToken } from '../models/index.ts';
import { signAccessToken, generateRefreshTokenRaw, hashToken, addDays } from '../utils/token.ts';
import { REFRESH_TOKEN_TTL_DAYS } from '../config/index.ts';

// helpers
function badRequest(res: Response, message: string) {
  return res.status(400).json({ message });
}

/**
 * POST /auth/register
 * body: { email, password }
 */
export async function register(req: Request, res: Response) {
  const email = String(req.body?.email ?? '');
  const password = String(req.body?.password ?? '');

  if (!email || !password || password.length < 8) {
    return badRequest(res, 'Invalid input');
  }

  const existing = await User.findOne({ email });
  if (existing) return badRequest(res, 'Email already registered');

  
  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    passwordHash,
    xp: 0,
  });
  console.log('New user created:', newUser);

  return res.status(201).json({
    message: 'Registered',
    user: {
      _id: newUser._id,
      email: newUser.email,
      xp: newUser.xp,
    },
  });
}

/**
 * POST /auth/login
 * body: { email, password }
 * returns: { token, user, refreshToken }
 */
export async function login(req: Request, res: Response) {
  const email = String(req.body?.email ?? '');
  const password = String(req.body?.password ?? '');

  if (!email || !password) return badRequest(res, 'Invalid input');

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

  user.xp = (user.xp || 0)
  await user.save();

  const accessToken = signAccessToken(String(user._id), user.email);

  // issue refresh token (store hash in DB, return raw to client)
  const rawRefresh = generateRefreshTokenRaw();
  const tokenHash = hashToken(rawRefresh);
  const expiresAt = addDays(new Date(), REFRESH_TOKEN_TTL_DAYS);

  await RefreshToken.create({
    user: user._id,
    tokenHash,
    expiresAt,
    revoked: false,
    createdByIp: req.ip
  });

  return res.json({
    token: accessToken,
    user: { _id: user._id, email: user.email, xp: user.xp },
    refreshToken: rawRefresh
  });
}

/**
 * POST /auth/refresh
 * body: { refreshToken }
 * returns: { token, refreshToken }
 */
export async function refresh(req: Request, res: Response) {
  const refreshToken = String(req.body?.refreshToken ?? '');
  if (!refreshToken) return badRequest(res, 'Missing refresh token');

  const tokenHash = hashToken(refreshToken);
  const existing = await RefreshToken.findOne({ tokenHash });
  if (!existing) return res.status(401).json({ message: 'Invalid refresh token' });
  if (existing.revoked) return res.status(401).json({ message: 'Token revoked' });
  if (existing.expiresAt.getTime() < Date.now()) {
    return res.status(401).json({ message: 'Token expired' });
  }

  // rotate current token
  existing.revoked = true;
  await existing.save();

  const user = await User.findById(existing.user);
  if (!user) return res.status(401).json({ message: 'User not found' });

  const newAccess = signAccessToken(String(user._id), user.email);
  const newRaw = generateRefreshTokenRaw();
  const newHash = hashToken(newRaw);
  const expiresAt = addDays(new Date(), REFRESH_TOKEN_TTL_DAYS);

  await RefreshToken.create({
    user: user._id,
    tokenHash: newHash,
    expiresAt,
    revoked: false,
    createdByIp: req.ip,
    replacedByTokenHash: null
  });

  return res.json({ token: newAccess, refreshToken: newRaw });
}

/**
 * POST /auth/logout
 * body: { refreshToken } (optional)
 */
export async function logout(req: Request, res: Response) {
  const token = req.body?.refreshToken as unknown;
  if (typeof token === 'string' && token.length > 0) {
    const tokenHash = hashToken(token);
    const doc = await RefreshToken.findOne({ tokenHash });
    if (doc) {
      doc.revoked = true;
      await doc.save();
    }
  }
  return res.json({ message: 'Logged out' });
}
