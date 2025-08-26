import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { allowRoles } from '../middlewares/roles';
import { fetchEducationDocs } from '../controllers/digilocker.controller';

const router = Router();

// Citizen: Fetch Aadhaar-linked education documents
router.get('/education-docs', auth, allowRoles('Citizen'), fetchEducationDocs);

export default router;
