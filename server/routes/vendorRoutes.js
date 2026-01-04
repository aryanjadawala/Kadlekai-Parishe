import express from 'express';
import {
  getAllVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorStats
} from '../controllers/vendorController.js';

const router = express.Router();

// Statistics route (before :id route to avoid conflicts)
router.get('/stats', getVendorStats);

// CRUD routes
router.route('/')
  .get(getAllVendors)
  .post(createVendor);

router.route('/:id')
  .get(getVendor)
  .put(updateVendor)
  .delete(deleteVendor);

export default router;
