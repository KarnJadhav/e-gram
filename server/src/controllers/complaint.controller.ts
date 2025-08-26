import { Request, Response } from 'express';
import Complaint from '../models/Complaint';
import User from '../models/User';
import { getIO } from '../utils/socket';

// Citizen: Submit complaint
export const createComplaint = async (req: Request, res: Response) => {
  try {
    const { category, description, location } = req.body;
    const complaint = new Complaint({
      citizenId: (req.user as any).id,
      category,
      description,
      location
    });
    await complaint.save();
    getIO().emit('complaintUpdated', complaint);
    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all complaints
export const getComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.find().populate('citizenId assignedTo');
    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Assign complaint to worker
export const assignComplaint = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedTo: workerId, status: 'In Progress' },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    getIO().emit('complaintUpdated', complaint);
    res.json({ message: 'Complaint assigned', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Worker: Update complaint status
export const updateComplaintStatus = async (req: Request, res: Response) => {
  try {
    const { status, proofImages } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    complaint.status = status;
    if (proofImages) complaint.proofImages = proofImages;
    await complaint.save();
    getIO().emit('complaintUpdated', complaint);
    res.json({ message: 'Complaint status updated', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
