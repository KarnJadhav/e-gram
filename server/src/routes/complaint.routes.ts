import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { allowRoles } from '../middlewares/roles';
import {
  createComplaint,
  getComplaints,
  assignComplaint,
  updateComplaintStatus
} from '../controllers/complaint.controller';

const router = Router();

// Citizen: Submit complaint
router.post('/', auth, allowRoles('Citizen'), createComplaint);

// Admin: Get all complaints, assign to worker
router.get('/', auth, allowRoles('Admin'), getComplaints);
router.post('/:id/assign', auth, allowRoles('Admin'), assignComplaint);

// Worker: Update complaint status
router.post('/:id/status', auth, allowRoles('Worker'), updateComplaintStatus);

export default router;
