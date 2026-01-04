import express from 'express';
import {
  submitReport,
  getAllReports,
  getVendorReports,
  updateReportStatus,
  deleteReport
} from '../controllers/reportController.js';

const router = express.Router();

// Public routes
router.post('/vendor/:vendorId', submitReport);

// Admin routes
router.get('/', getAllReports);
router.get('/vendor/:vendorId', getVendorReports);
router.put('/:reportId/status', updateReportStatus);
router.delete('/:reportId', deleteReport);

export default router;
