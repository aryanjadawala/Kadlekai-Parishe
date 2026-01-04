import Vendor from '../models/Vendor.js';
import Volunteer from '../models/Volunteer.js';
import Parking from '../models/Parking.js';

// Dashboard Overview Stats
export const getDashboardStats = async (req, res) => {
  try {
    // Vendor stats
    const totalVendors = await Vendor.countDocuments();
    const pendingVendors = await Vendor.countDocuments({ status: 'pending' });
    const approvedVendors = await Vendor.countDocuments({ status: 'approved' });
    
    // Volunteer stats
    const totalVolunteers = await Volunteer.countDocuments();
    const pendingVolunteers = await Volunteer.countDocuments({ status: 'registered' });
    const approvedVolunteers = await Volunteer.countDocuments({ status: 'approved' });
    const activeVolunteers = await Volunteer.countDocuments({ status: 'active' });
    
    // Parking stats
    const totalParkingSlots = await Parking.countDocuments();
    const occupiedSlots = await Parking.countDocuments({ isOccupied: true });
    
    // Footfall estimation (unique vehicles checked in today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayFootfall = await Parking.countDocuments({
      entryTime: { $gte: today },
      isOccupied: true
    });
    
    // Total footfall (all-time unique check-ins)
    const totalFootfall = await Parking.aggregate([
      {
        $match: {
          vehicleNumber: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Category breakdown
    const vendorsByCategory = await Vendor.aggregate([
      { $group: { _id: '$productCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const volunteersByRole = await Volunteer.aggregate([
      { $group: { _id: '$assignedRole', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const volunteersByShift = await Volunteer.aggregate([
      { $group: { _id: '$shiftTiming', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        vendors: {
          total: totalVendors,
          pending: pendingVendors,
          approved: approvedVendors
        },
        volunteers: {
          total: totalVolunteers,
          pending: pendingVolunteers,
          approved: approvedVolunteers,
          active: activeVolunteers
        },
        parking: {
          total: totalParkingSlots,
          occupied: occupiedSlots,
          available: totalParkingSlots - occupiedSlots
        },
        footfall: {
          today: todayFootfall,
          total: totalFootfall[0]?.count || 0
        },
        breakdown: {
          vendorsByCategory,
          volunteersByRole,
          volunteersByShift
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// Get all pending approvals
export const getPendingApprovals = async (req, res) => {
  try {
    const pendingVendors = await Vendor.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(20);
      
    const pendingVolunteers = await Volunteer.find({ status: 'registered' })
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      data: {
        vendors: pendingVendors,
        volunteers: pendingVolunteers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending approvals',
      error: error.message
    });
  }
};

// Approve/Reject Vendor
export const updateVendorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, stallNumber, stallLocation, notes } = req.body;
    
    const updateData = { status };
    if (stallNumber) updateData.stallNumber = stallNumber;
    if (stallLocation) updateData.stallLocation = stallLocation;
    if (notes) updateData.notes = notes;
    
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Vendor ${status} successfully`,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating vendor status',
      error: error.message
    });
  }
};

// Approve/Reject Volunteer
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedRole, assignedArea, shiftTiming, notes } = req.body;
    
    const updateData = { status };
    if (assignedRole) updateData.assignedRole = assignedRole;
    if (assignedArea) updateData.assignedArea = assignedArea;
    if (shiftTiming) updateData.shiftTiming = shiftTiming;
    if (notes) updateData.notes = notes;
    
    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Volunteer ${status} successfully`,
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating volunteer status',
      error: error.message
    });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const recentVendors = await Vendor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name businessName status createdAt');
      
    const recentVolunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name assignedRole status createdAt');
    
    res.status(200).json({
      success: true,
      data: {
        vendors: recentVendors,
        volunteers: recentVolunteers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activities',
      error: error.message
    });
  }
};

// Footfall analytics by hour/day
export const getFootfallAnalytics = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    let startDate;
    if (period === 'today') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    }
    
    const footfallByHour = await Parking.aggregate([
      {
        $match: {
          entryTime: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $hour: '$entryTime' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const footfallByZone = await Parking.aggregate([
      {
        $match: {
          entryTime: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$zone',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        byHour: footfallByHour,
        byZone: footfallByZone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching footfall analytics',
      error: error.message
    });
  }
};
