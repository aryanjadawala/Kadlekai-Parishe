import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  reviewerName: {
    type: String,
    required: [true, 'Reviewer name is required'],
    trim: true
  },
  reviewerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ vendor: 1, createdAt: -1 });
reviewSchema.index({ status: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
