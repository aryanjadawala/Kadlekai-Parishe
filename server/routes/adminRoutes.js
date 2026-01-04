import express from 'express';
import {
  getDashboardStats,
  getPendingApprovals,
  updateVendorStatus,
  updateVolunteerStatus,
  getRecentActivities,
  getFootfallAnalytics
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Pending approvals
router.get('/pending', getPendingApprovals);

// Recent activities
router.get('/activities', getRecentActivities);

// Footfall analytics
router.get('/footfall', getFootfallAnalytics);

// Approve/reject vendor
router.put('/vendors/:id/status', updateVendorStatus);

// Approve/reject volunteer
router.put('/volunteers/:id/status', updateVolunteerStatus);

export default router;
