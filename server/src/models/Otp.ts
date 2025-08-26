import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
  mobile: string;
  code: string;
  expiresAt: Date;
  consumed: boolean;
}

const OtpSchema = new Schema<IOtp>({
  mobile: { type: String, unique: true, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  consumed: { type: Boolean, default: false }
});

export default mongoose.model<IOtp>('Otp', OtpSchema);
