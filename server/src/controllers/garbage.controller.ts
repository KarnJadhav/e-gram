import { Request, Response } from 'express';
import GarbageTask from '../models/GarbageTask';
import { getIO } from '../utils/socket';

// Citizen: Request garbage pickup
export const requestGarbagePickup = async (req: Request, res: Response) => {
  try {
    const { route, date } = req.body;
    // For citizen, no worker assigned yet
    const task = new GarbageTask({
      route,
      date,
      status: 'Assigned'
    });
    await task.save();
    getIO().emit('garbageScheduleUpdated', task);
    res.status(201).json({ message: 'Garbage pickup requested', task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all garbage tasks
export const getGarbageTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await GarbageTask.find().populate('workerId');
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Assign garbage task to worker
export const assignGarbageTask = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.body;
    const task = await GarbageTask.findByIdAndUpdate(
      req.params.id,
      { workerId, status: 'Assigned' },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    getIO().emit('garbageScheduleUpdated', task);
    res.json({ message: 'Garbage task assigned', task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Worker: Update garbage status
export const updateGarbageStatus = async (req: Request, res: Response) => {
  try {
    const { status, proofImages } = req.body;
    const task = await GarbageTask.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.status = status;
    if (proofImages) task.proofImages = proofImages;
    await task.save();
    res.json({ message: 'Task status updated', task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
