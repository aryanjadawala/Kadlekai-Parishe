import Parking from '../models/Parking.js';

// Get all parking slots
export const getAllParkingSlots = async (req, res) => {
  try {
    const { zone, status, vehicleType, isOccupied } = req.query;
    const filter = {};
    
    if (zone) filter.zone = zone;
    if (status) filter.status = status;
    if (vehicleType) filter.vehicleType = vehicleType;
    if (isOccupied !== undefined) filter.isOccupied = isOccupied === 'true';
    
    const parkingSlots = await Parking.find(filter).sort({ slotNumber: 1 });
    res.status(200).json({
      success: true,
      count: parkingSlots.length,
      data: parkingSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking slots',
      error: error.message
    });
  }
};

// Get single parking slot
export const getParkingSlot = async (req, res) => {
  try {
    const parkingSlot = await Parking.findById(req.params.id);
    
    if (!parkingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: parkingSlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking slot',
      error: error.message
    });
  }
};

// Create new parking slot
export const createParkingSlot = async (req, res) => {
  try {
    const parkingSlot = await Parking.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Parking slot created successfully',
      data: parkingSlot
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating parking slot',
      error: error.message
    });
  }
};

// Update parking slot
export const updateParkingSlot = async (req, res) => {
  try {
    const parkingSlot = await Parking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!parkingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Parking slot updated successfully',
      data: parkingSlot
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating parking slot',
      error: error.message
    });
  }
};

// Delete parking slot
export const deleteParkingSlot = async (req, res) => {
  try {
    const parkingSlot = await Parking.findByIdAndDelete(req.params.id);
    
    if (!parkingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Parking slot deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting parking slot',
      error: error.message
    });
  }
};

// Check-in vehicle (occupy slot)
export const checkInVehicle = async (req, res) => {
  try {
    const { vehicleNumber, driverName, driverContact, attendant } = req.body;
    
    const parkingSlot = await Parking.findById(req.params.id);
    
    if (!parkingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }
    
    if (parkingSlot.isOccupied || parkingSlot.status === 'occupied') {
      return res.status(400).json({
        success: false,
        message: 'Parking slot is already occupied'
      });
    }
    
    parkingSlot.vehicleNumber = vehicleNumber;
    parkingSlot.driverName = driverName;
    parkingSlot.driverContact = driverContact;
    parkingSlot.attendant = attendant;
    parkingSlot.entryTime = new Date();
    parkingSlot.status = 'occupied';
    parkingSlot.isOccupied = true;
    
    await parkingSlot.save();
    
    res.status(200).json({
      success: true,
      message: 'Vehicle checked in successfully',
      data: parkingSlot
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error checking in vehicle',
      error: error.message
    });
  }
};

// Check-out vehicle (vacate slot)
export const checkOutVehicle = async (req, res) => {
  try {
    const { parkingFee, paymentStatus } = req.body;
    
    const parkingSlot = await Parking.findById(req.params.id);
    
    if (!parkingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }
    
    if (!parkingSlot.isOccupied) {
      return res.status(400).json({
        success: false,
        message: 'Parking slot is not occupied'
      });
    }
    
    parkingSlot.exitTime = new Date();
    
    // Calculate duration in minutes
    if (parkingSlot.entryTime) {
      parkingSlot.duration = Math.floor((parkingSlot.exitTime - parkingSlot.entryTime) / (1000 * 60));
    }
    
    parkingSlot.parkingFee = parkingFee || 0;
    parkingSlot.paymentStatus = paymentStatus || 'unpaid';
    parkingSlot.status = 'available';
    parkingSlot.isOccupied = false;
    
    await parkingSlot.save();
    
    // Store the data before clearing
    const checkoutData = {
      slotNumber: parkingSlot.slotNumber,
      vehicleNumber: parkingSlot.vehicleNumber,
      driverName: parkingSlot.driverName,
      entryTime: parkingSlot.entryTime,
      exitTime: parkingSlot.exitTime,
      duration: parkingSlot.duration,
      parkingFee: parkingSlot.parkingFee,
      paymentStatus: parkingSlot.paymentStatus
    };
    
    // Clear vehicle data
    parkingSlot.vehicleNumber = undefined;
    parkingSlot.driverName = undefined;
    parkingSlot.driverContact = undefined;
    parkingSlot.entryTime = undefined;
    parkingSlot.exitTime = undefined;
    
    await parkingSlot.save();
    
    res.status(200).json({
      success: true,
      message: 'Vehicle checked out successfully',
      data: checkoutData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error checking out vehicle',
      error: error.message
    });
  }
};

// Get parking statistics
export const getParkingStats = async (req, res) => {
  try {
    const zoneStats = await Parking.aggregate([
      {
        $group: {
          _id: '$zone',
          totalSlots: { $sum: 1 },
          occupiedSlots: {
            $sum: { $cond: [{ $eq: ['$isOccupied', true] }, 1, 0] }
          },
          availableSlots: {
            $sum: { $cond: [{ $eq: ['$isOccupied', false] }, 1, 0] }
          }
        }
      }
    ]);
    
    const statusStats = await Parking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalSlots = await Parking.countDocuments();
    const occupiedSlots = await Parking.countDocuments({ isOccupied: true });
    const availableSlots = totalSlots - occupiedSlots;
    
    res.status(200).json({
      success: true,
      data: {
        totalSlots,
        occupiedSlots,
        availableSlots,
        occupancyRate: totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(2) : 0,
        zoneStats,
        statusStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking statistics',
      error: error.message
    });
  }
};
