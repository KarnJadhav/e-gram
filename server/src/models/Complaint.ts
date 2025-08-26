import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  citizenId: mongoose.Types.ObjectId;
  category: 'Road' | 'Water' | 'Electricity' | 'Sanitation' | 'Other';
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  assignedTo?: mongoose.Types.ObjectId;
  proofImages?: { url: string; key: string }[];
  location?: string;
}

const ComplaintSchema = new Schema<IComplaint>({
  citizenId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['Road', 'Water', 'Electricity', 'Sanitation', 'Other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  proofImages: [{ url: String, key: String }],
  location: String
}, { timestamps: true });

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema);
