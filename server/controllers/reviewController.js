import Review from '../models/Review.js';
import Vendor from '../models/Vendor.js';

// Submit a review
export const submitReview = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { rating, comment, reviewerName, reviewerEmail } = req.body;

    // Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    const review = await Review.create({
      vendor: vendorId,
      rating,
      comment,
      reviewerName,
      reviewerEmail,
      status: 'approved',
      isApproved: true
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
};

// Get approved reviews for a vendor
export const getVendorReviews = async (req, res) => {
  try {
    const { vendorId } = req.params;
    
    const reviews = await Review.find({
      vendor: vendorId,
      status: 'approved'
    }).sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.status(200).json({
      success: true,
      count: reviews.length,
      averageRating: avgRating.toFixed(1),
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// Get all pending reviews (Admin)
export const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'pending' })
      .populate('vendor', 'businessName name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending reviews',
      error: error.message
    });
  }
};

// Update review status (Admin)
export const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status, isApproved: status === 'approved' },
      { new: true, runValidators: true }
    ).populate('vendor', 'businessName');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Review ${status} successfully`,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating review status',
      error: error.message
    });
  }
};

// Delete review (Admin)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findByIdAndDelete(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};
