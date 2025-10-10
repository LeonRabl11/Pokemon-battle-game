import './db.ts'; // connect to Mongo

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/index.ts';
import { errorHandler, notFoundHandler } from './middlewares/index.ts';
import { CLIENT_ORIGINS } from './config/index.ts';

const app = express();

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      cb(null, CLIENT_ORIGINS.includes(origin));
    },
    credentials: true,
    exposedHeaders: ['WWW-Authenticate']
  })
);


app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
