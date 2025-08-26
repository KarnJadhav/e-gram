const mongoose = require('mongoose');

const educationDocSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  board: { type: String, required: true },
  issueDate: { type: Date, required: true },
  percentage: { type: Number },
  verified: { type: Boolean, default: false },
  fileUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('EducationDoc', educationDocSchema);
