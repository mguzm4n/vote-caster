
import mongoose, { Schema } from 'mongoose';

type ROLES = 'Admin' | 'User';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Partial<Record<ROLES, number>>,
  password: string;
}

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  roles: {
    User: { type: Number, default: 1 }
  },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);


