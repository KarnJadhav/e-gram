import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { allowRoles } from '../middlewares/roles';
import {
  requestGarbagePickup,
  getGarbageTasks,
  assignGarbageTask,
  updateGarbageStatus
} from '../controllers/garbage.controller';

const router = Router();

// Citizen: Request garbage pickup
router.post('/request', auth, allowRoles('Citizen'), requestGarbagePickup);

// Admin: Get all garbage tasks, assign to worker
router.get('/', auth, allowRoles('Admin'), getGarbageTasks);
router.post('/:id/assign', auth, allowRoles('Admin'), assignGarbageTask);

// Worker: Update garbage status
router.post('/:id/status', auth, allowRoles('Worker'), updateGarbageStatus);

export default router;
