const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
  status: { type: String, enum: ['Active', 'Resolved', 'Rejected'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
