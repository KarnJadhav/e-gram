import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { allowRoles } from '../middlewares/roles';
import {
  applyCertificate,
  getCertificates,
  reviewCertificate
} from '../controllers/certificate.controller';

const router = Router();

// Citizen: Apply for certificate
router.post('/', auth, allowRoles('Citizen'), applyCertificate);

// Admin: Get all certificates, review (approve/reject)
router.get('/', auth, allowRoles('Admin'), getCertificates);
router.post('/:id/review', auth, allowRoles('Admin'), reviewCertificate);

export default router;
