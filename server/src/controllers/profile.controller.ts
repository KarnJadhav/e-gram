import { Request, Response } from 'express';
import User from '../models/User';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Multer setup for profile photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/profilePhotos'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Support both id and _id, fallback to 'unknown' if not present
  const userId = req.user && req.user.id ? req.user.id : 'unknown';
  cb(null, userId + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.user.id;
    const { name, mobile, email } = req.body;
    let update: any = { name, mobile, email };
    if (req.file) {
      update.profilePhoto = `/uploads/profilePhotos/${req.file.filename}`;
    }
    const user = await User.findByIdAndUpdate(userId, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Emit profileUpdated event via Socket.IO if needed
    if (req.app.get('io')) {
      req.app.get('io').emit('profileUpdated', { userId, user });
    }
    res.json({ message: 'Profile updated', user });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
