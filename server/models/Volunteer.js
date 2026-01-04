import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Volunteer name is required'],
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
  age: {
    type: Number,
    min: [16, 'Volunteer must be at least 16 years old'],
    max: [80, 'Age must be less than 80']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  assignedRole: {
    type: String,
    enum: ['Crowd Management', 'Information Desk', 'Medical Support', 'Parking Management', 'General Support', 'Security', 'Unassigned'],
    default: 'Unassigned'
  },
  assignedArea: {
    type: String,
    trim: true
  },
  shiftTiming: {
    type: String,
    enum: ['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-10PM)', 'Full Day', 'Not Assigned'],
    default: 'Not Assigned'
  },
  availability: {
    type: [Date],
    default: []
  },
  experience: {
    type: String,
    enum: ['First Time', 'Experienced (1-2 events)', 'Very Experienced (3+ events)'],
    default: 'First Time'
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    relation: String
  },
  status: {
    type: String,
    enum: ['registered', 'approved', 'active', 'inactive', 'completed'],
    default: 'registered'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  },
  tshirtSize: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Not Required']
  }
}, {
  timestamps: true
});

// Indexes
volunteerSchema.index({ email: 1 });
volunteerSchema.index({ contactNumber: 1 });
volunteerSchema.index({ status: 1 });
volunteerSchema.index({ assignedRole: 1 });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
