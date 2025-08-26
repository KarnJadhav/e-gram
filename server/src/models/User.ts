import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  aadhaar: string;
  name: string;
  username: string;
  mobile: string;
  password: string;
  role: 'Citizen' | 'Admin' | 'Worker';
  isActive: boolean;
  profilePhoto: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  aadhaar: { type: String, required: true, unique: true, match: /^\d{12}$/ },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, match: /^(?:\+?91)?[6-9]\d{9}$/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['Citizen', 'Admin', 'Worker'], default: 'Citizen' },
  isActive: { type: Boolean, default: true },
  // email field removed, username is now the unique identifier
  profilePhoto: {
    type: String,
    default: '', // Will store file path or URL
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    console.error('Password hashing error:', err);
  next(err as Error);
  }
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
