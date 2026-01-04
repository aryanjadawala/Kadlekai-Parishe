import express from 'express';
import {
  getAllVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorStats
} from '../controllers/vendorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Statistics route (before :id route to avoid conflicts)
router.get('/stats', getVendorStats);

// CRUD routes
router.route('/')
  .get(getAllVendors)
  .post(createVendor);

router.route('/:id')
  .get(getVendor)
  .put(protect, updateVendor)  // Admin only
  .delete(protect, deleteVendor);  // Admin only

export default router;
