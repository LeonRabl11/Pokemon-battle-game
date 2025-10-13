// src/db.ts
import mongoose from 'mongoose';
import { MONGODB_URI, DB_NAME } from './config/index.ts';

const uri = MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI is not set');
  process.exit(1);
}

// Optional: tighten queries behavior (good default)
mongoose.set('strictQuery', true);

mongoose
  .connect(uri, { dbName: DB_NAME })
  .then(client => {
    console.log('✅ Connected to MongoDB:', client.connection.name);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
