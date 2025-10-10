import mongoose, { Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true
    },
    passwordHash: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
