import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4001),

  // DB
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  DB_NAME: z.string().default('pokemon-auth'),

  // Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 chars'),
  // jsonwebtoken accepts string like "1h" or a numeric seconds value
  JWT_EXPIRES_IN: z.union([z.string().min(1), z.coerce.number().positive()]).default('1h'),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:5173') // can be comma-separated list
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const {
  PORT,
  MONGODB_URI,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_TTL_DAYS,
  CORS_ORIGIN
} = parsed.data;

// Support multiple origins separated by commas
export const CLIENT_ORIGINS = CORS_ORIGIN.split(',').map(s => s.trim());
// For simple cases where you just need one string:
export const CLIENT_BASE_URL = CLIENT_ORIGINS[0] ?? 'http://localhost:5173';
