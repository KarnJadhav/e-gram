import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'Birth' | 'Death' | 'Residence' | 'Income';
  status: 'Submitted' | 'Approved' | 'Rejected';
  remarks?: string;
  fileUrl?: string;
}

const CertificateSchema = new Schema<ICertificate>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Birth', 'Death', 'Residence', 'Income'], required: true },
  status: { type: String, enum: ['Submitted', 'Approved', 'Rejected'], default: 'Submitted' },
  remarks: String,
  fileUrl: String
}, { timestamps: true });

export default mongoose.model<ICertificate>('Certificate', CertificateSchema);
