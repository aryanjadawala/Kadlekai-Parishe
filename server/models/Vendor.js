import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  stallNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  stallLocation: {
    type: String,
    trim: true
  },
  productCategory: {
    type: String,
    enum: ['Groundnuts', 'Food', 'Bangles', 'Toys', 'Wooden Works', 'Decorative Items', 'Handicrafts', 'Clothing', 'Religious Items', 'Other'],
    required: true
  },
  productDescription: {
    type: String,
    trim: true
  },
  productPhoto: {
    type: String,
    trim: true,
    default: 'https://via.placeholder.com/400x300?text=No+Product+Image'
  },
  gstNumber: {
    type: String,
    trim: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'inactive'],
    default: 'pending'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  emergencyContact: {
    name: String,
    phone: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
vendorSchema.index({ email: 1 });
vendorSchema.index({ contactNumber: 1 });
vendorSchema.index({ status: 1 });

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
