import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  reportType: {
    type: String,
    enum: ['Quality Issue', 'Overcharging', 'Misbehavior', 'Hygiene Issue', 'Fraud', 'Other'],
    required: [true, 'Report type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  reporterName: {
    type: String,
    required: [true, 'Reporter name is required'],
    trim: true
  },
  reporterEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  reporterContact: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved', 'dismissed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  resolvedBy: {
    type: String,
    trim: true
  },
  resolvedAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes
reportSchema.index({ vendor: 1, createdAt: -1 });
reportSchema.index({ status: 1 });
reportSchema.index({ priority: 1 });

const Report = mongoose.model('Report', reportSchema);

export default Report;
