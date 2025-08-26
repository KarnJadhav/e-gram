import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  roleTarget: 'Citizen' | 'Admin' | 'Worker' | 'All';
  pinned: boolean;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  roleTarget: { type: String, enum: ['Citizen', 'Admin', 'Worker', 'All'], default: 'All' },
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
