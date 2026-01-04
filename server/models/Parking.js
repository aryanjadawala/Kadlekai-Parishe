import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: [true, 'Parking slot number is required'],
    unique: true,
    trim: true
  },
  zone: {
    type: String,
    required: [true, 'Parking zone is required'],
    enum: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'VIP Zone', 'Two Wheeler Zone', 'Four Wheeler Zone'],
    trim: true
  },
  vehicleType: {
    type: String,
    enum: ['Two Wheeler', 'Four Wheeler', 'Heavy Vehicle', 'Any'],
    default: 'Any'
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  vehicleNumber: {
    type: String,
    trim: true,
    uppercase: true,
    sparse: true
  },
  driverName: {
    type: String,
    trim: true
  },
  driverContact: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  entryTime: {
    type: Date
  },
  exitTime: {
    type: Date
  },
  duration: {
    type: Number, // Duration in minutes
    default: 0
  },
  parkingFee: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'exempt'],
    default: 'unpaid'
  },
  attendant: {
    type: String,
    trim: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Indexes
parkingSchema.index({ slotNumber: 1 });
parkingSchema.index({ zone: 1 });
parkingSchema.index({ isOccupied: 1 });
parkingSchema.index({ status: 1 });
parkingSchema.index({ vehicleNumber: 1 });

// Virtual for parking duration calculation
parkingSchema.virtual('calculatedDuration').get(function() {
  if (this.entryTime && this.exitTime) {
    return Math.floor((this.exitTime - this.entryTime) / (1000 * 60)); // Duration in minutes
  }
  return 0;
});

// Pre-save middleware to update isOccupied based on status
parkingSchema.pre('save', function(next) {
  if (this.status === 'occupied') {
    this.isOccupied = true;
  } else if (this.status === 'available') {
    this.isOccupied = false;
  }
  next();
});

const Parking = mongoose.model('Parking', parkingSchema);

export default Parking;
