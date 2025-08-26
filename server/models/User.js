const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  aadhaar: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Citizen', 'Admin'], default: 'Citizen' },
  profilePic: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
