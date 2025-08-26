import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  owner: mongoose.Types.ObjectId;
  type: 'ComplaintProof' | 'CertificateFile' | 'GarbageProof';
  url: string;
  key: string;
  meta?: any;
}

const FileSchema = new Schema<IFile>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['ComplaintProof', 'CertificateFile', 'GarbageProof'], required: true },
  url: { type: String, required: true },
  key: { type: String, required: true },
  meta: Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model<IFile>('File', FileSchema);
