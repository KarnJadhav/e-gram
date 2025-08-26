import { Request, Response } from 'express';
import Certificate from '../models/Certificate';
import { getIO } from '../utils/socket';

// Citizen: Apply for certificate
export const applyCertificate = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const certificate = new Certificate({
      userId: (req.user as any).id,
      type
    });
    await certificate.save();
    getIO().emit('newNotification', { text: 'New certificate application submitted.' });
    res.status(201).json({ message: 'Certificate application submitted', certificate });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all certificates
export const getCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find().populate('userId');
    res.json({ certificates });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Review certificate (approve/reject)
export const reviewCertificate = async (req: Request, res: Response) => {
  try {
    const { status, remarks, fileUrl } = req.body;
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    certificate.status = status;
    certificate.remarks = remarks;
    if (fileUrl) certificate.fileUrl = fileUrl;
    await certificate.save();
    getIO().emit('newNotification', { text: `Certificate ${certificate.status}` });
    res.json({ message: 'Certificate reviewed', certificate });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
