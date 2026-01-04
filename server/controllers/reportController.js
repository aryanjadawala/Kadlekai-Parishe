import Report from '../models/Report.js';
import Vendor from '../models/Vendor.js';

// Submit a report
export const submitReport = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { reportType, description, reporterName, reporterEmail, reporterContact } = req.body;

    // Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    const report = await Report.create({
      vendor: vendorId,
      reportType,
      description,
      reporterName,
      reporterEmail,
      reporterContact
    });

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully. Admin will review it shortly.',
      data: report
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting report',
      error: error.message
    });
  }
};

// Get all reports (Admin)
export const getAllReports = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const reports = await Report.find(filter)
      .populate('vendor', 'businessName name stallNumber')
      .sort({ priority: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get vendor reports
export const getVendorReports = async (req, res) => {
  try {
    const { vendorId } = req.params;
    
    const reports = await Report.find({ vendor: vendorId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor reports',
      error: error.message
    });
  }
};

// Update report status (Admin)
export const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNotes, priority, resolvedBy } = req.body;

    const updateData = { status, adminNotes, priority };
    
    if (status === 'resolved' || status === 'dismissed') {
      updateData.resolvedAt = new Date();
      if (resolvedBy) updateData.resolvedBy = resolvedBy;
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      updateData,
      { new: true, runValidators: true }
    ).populate('vendor', 'businessName');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: report
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating report',
      error: error.message
    });
  }
};

// Delete report (Admin)
export const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    
    const report = await Report.findByIdAndDelete(reportId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting report',
      error: error.message
    });
  }
};
