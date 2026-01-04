import Volunteer from '../models/Volunteer.js';

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const { status, assignedRole, shiftTiming } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (assignedRole) filter.assignedRole = assignedRole;
    if (shiftTiming) filter.shiftTiming = shiftTiming;
    
    const volunteers = await Volunteer.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching volunteers',
      error: error.message
    });
  }
};

// Get single volunteer
export const getVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching volunteer',
      error: error.message
    });
  }
};

// Create new volunteer
export const createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Volunteer registered successfully',
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error registering volunteer',
      error: error.message
    });
  }
};

// Update volunteer
export const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
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
      message: 'Volunteer updated successfully',
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating volunteer',
      error: error.message
    });
  }
};

// Delete volunteer
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Volunteer deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting volunteer',
      error: error.message
    });
  }
};

// Get volunteer statistics
export const getVolunteerStats = async (req, res) => {
  try {
    const roleStats = await Volunteer.aggregate([
      {
        $group: {
          _id: '$assignedRole',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const statusStats = await Volunteer.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const shiftStats = await Volunteer.aggregate([
      {
        $group: {
          _id: '$shiftTiming',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        roleStats,
        statusStats,
        shiftStats,
        totalVolunteers: await Volunteer.countDocuments()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching volunteer statistics',
      error: error.message
    });
  }
};
