import express from 'express';
import {
  submitReview,
  getVendorReviews,
  getPendingReviews,
  updateReviewStatus,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Public routes
router.post('/vendor/:vendorId', submitReview);
router.get('/vendor/:vendorId', getVendorReviews);

// Admin routes
router.get('/pending', getPendingReviews);
router.put('/:reviewId/status', updateReviewStatus);
router.delete('/:reviewId', deleteReview);

export default router;
