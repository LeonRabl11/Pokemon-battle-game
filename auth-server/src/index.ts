// src/index.ts
import 'dotenv/config'; // load env FIRST
import app from './app.ts';
import { PORT } from './config/index.ts';
import './db.ts';

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
