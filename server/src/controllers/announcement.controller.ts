import { Request, Response } from 'express';
import Announcement from '../models/Announcement';
import { getIO } from '../utils/socket';

// Admin: Post announcement/scheme
export const postAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, message, roleTarget, pinned } = req.body;
    const announcement = new Announcement({ title, message, roleTarget, pinned });
    await announcement.save();
    // Emit real-time event via Socket.IO
    const io = getIO();
    io.emit('announcement', announcement);
    res.status(201).json({ message: 'Announcement posted', announcement });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// All: Get announcements
export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ announcements });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
