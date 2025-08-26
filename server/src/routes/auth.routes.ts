import { Router, Request, Response } from 'express';
import { register, login, me, logout } from '../controllers/auth.controller';
import User from '../models/User';
import Complaint from '../models/Complaint';
import Certificate from '../models/Certificate';
import GarbageTask from '../models/GarbageTask';
import { allowRoles } from '../middlewares/roles';
import { auth } from '../middlewares/auth';

const router = Router();

// Auth endpoints
router.post('/register', register);
router.post('/login', login);

// Profile update endpoint
import { updateProfile, upload } from '../controllers/profile.controller';
router.post('/update', auth, upload.single('profilePhoto'), updateProfile);

// Dashboard route (for CitizenDashboard.tsx)
router.get('/dashboard', auth, async (req: Request, res: Response) => {
	try {
		// @ts-ignore
		const userId = req.user._id || req.user.id;
		const user = await User.findById(userId).select('-password');
		const complaints = await Complaint.find({ user: userId });
		const certificates = await Certificate.find({ user: userId });
		const garbage = await GarbageTask.find({ user: userId });
		// For notifications, you may have a Notification model or use mock data
		const notifications: any[] = [];
		res.json({ user, complaints, applications: certificates, pickup: garbage[0], notifications });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Example dashboard handlers (optional, keep if needed)
const citizenDashboardHandler = (req: Request, res: Response) => res.json({ message: 'Citizen Dashboard' });
const adminDashboardHandler = (req: Request, res: Response) => res.json({ message: 'Admin Dashboard' });
const workerDashboardHandler = (req: Request, res: Response) => res.json({ message: 'Worker Dashboard' });
router.get('/dashboard/citizen', auth, allowRoles('Citizen'), citizenDashboardHandler);
router.get('/dashboard/admin', auth, allowRoles('Admin'), adminDashboardHandler);
router.get('/dashboard/worker', auth, allowRoles('Worker'), workerDashboardHandler);

export default router;
