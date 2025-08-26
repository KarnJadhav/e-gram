import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { allowRoles } from '../middlewares/roles';
import {
  postAnnouncement,
  getAnnouncements
} from '../controllers/announcement.controller';

const router = Router();

// Admin: Post announcement/scheme
router.post('/', auth, allowRoles('Admin'), postAnnouncement);

// All: Get announcements
router.get('/', auth, getAnnouncements);

export default router;
