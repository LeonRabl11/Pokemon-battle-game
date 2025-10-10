import mongoose, { Schema } from 'mongoose';
import type { Document, Model, Types } from 'mongoose';

export interface IRefreshToken extends Document {
  user: Types.ObjectId;
  tokenHash: string; // store only the hash of the refresh token
  expiresAt: Date;
  revoked: boolean;
  createdByIp?: string;
  replacedByTokenHash?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    revoked: { type: Boolean, default: false },
    createdByIp: { type: String },
    replacedByTokenHash: { type: String, default: null }
  },
  { timestamps: true, versionKey: false }
);

export const RefreshToken: Model<IRefreshToken> =
  mongoose.models.RefreshToken || mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
