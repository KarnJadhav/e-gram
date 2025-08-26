const mongoose = require('mongoose');

const garbageRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  pickupTime: { type: Date, required: true },
  garbageType: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['Requested', 'Completed', 'Rejected'], default: 'Requested' },
}, { timestamps: true });

module.exports = mongoose.model('GarbageRequest', garbageRequestSchema);
