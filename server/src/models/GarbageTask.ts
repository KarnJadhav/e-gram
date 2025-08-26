import mongoose, { Document, Schema } from 'mongoose';

export interface IGarbageTask extends Document {
  workerId: mongoose.Types.ObjectId;
  route: string;
  date: Date;
  status: 'Assigned' | 'Collected' | 'Missed' | 'Delayed';
  proofImages?: { url: string; key: string }[];
}

const GarbageTaskSchema = new Schema<IGarbageTask>({
  workerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  route: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Assigned', 'Collected', 'Missed', 'Delayed'], default: 'Assigned' },
  proofImages: [{ url: String, key: String }]
}, { timestamps: true });

export default mongoose.model<IGarbageTask>('GarbageTask', GarbageTaskSchema);
