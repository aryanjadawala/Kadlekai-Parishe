import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { volunteerAPI } from '../../api';
import adminAPI from '../../api/admin';

export default function VolunteerManagement({ onUpdate }) {
  const [volunteers, setVolunteers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    assignedRole: '',
    assignedArea: '',
    shiftTiming: ''
  });

  useEffect(() => {
    fetchVolunteers();
  }, [filter]);

  const fetchVolunteers = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await volunteerAPI.getAll(params);
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (volunteerId, status) => {
    try {
      const updateData = { status };
      
      if (status === 'approved' && selectedVolunteer) {
        updateData.assignedRole = assignmentData.assignedRole || selectedVolunteer.assignedRole;
        updateData.assignedArea = assignmentData.assignedArea;
        updateData.shiftTiming = assignmentData.shiftTiming || selectedVolunteer.shiftTiming;
      }
      
      await adminAPI.updateVolunteerStatus(volunteerId, updateData);
      fetchVolunteers();
      onUpdate();
      setSelectedVolunteer(null);
      setAssignmentData({ assignedRole: '', assignedArea: '', shiftTiming: '' });
      alert(`Volunteer ${status} successfully!`);
    } catch (error) {
      alert('Error updating volunteer status: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      registered: 'yellow',
      approved: 'green',
      active: 'blue',
      inactive: 'gray',
      completed: 'purple',
    };
    return colors[status] || 'gray';
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        {['all', 'registered', 'approved', 'active', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === status
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer, index) => (
          <motion.div
            key={volunteer._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            {/* Volunteer Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {volunteer.name}
                </h3>
                <p className="text-sm text-gray-600">{volunteer.email}</p>
                <p className="text-sm text-gray-600">{volunteer.contactNumber}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                  volunteer.status
                )}-100 text-${getStatusColor(volunteer.status)}-800`}
              >
                {volunteer.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Role:</span>
                <span className="text-gray-600">{volunteer.assignedRole}</span>
              </div>
              {volunteer.assignedArea && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Area:</span>
                  <span className="text-gray-600">{volunteer.assignedArea}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Shift:</span>
                <span className="text-gray-600">{volunteer.shiftTiming}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Experience:</span>
                <span className="text-gray-600">{volunteer.experience}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedVolunteer(volunteer)}
                className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 text-sm"
              >
                View Details
              </button>
              {volunteer.status === 'registered' && (
                <button
                  onClick={() => {
                    setSelectedVolunteer(volunteer);
                    setAssignmentData({
                      assignedRole: volunteer.assignedRole,
                      assignedArea: '',
                      shiftTiming: volunteer.shiftTiming
                    });
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm"
                >
                  Approve
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {volunteers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No volunteers found for the selected filter.
        </div>
      )}

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Profile
              </h2>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedVolunteer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{selectedVolunteer.age || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900">{selectedVolunteer.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">T-Shirt Size</label>
                    <p className="text-gray-900">{selectedVolunteer.tshirtSize || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact</label>
                    <p className="text-gray-900">{selectedVolunteer.contactNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedVolunteer.email}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Details */}
              {selectedVolunteer.status === 'registered' ? (
                <>
                  {/* Volunteer's Preferences */}
                  <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      📋 Volunteer's Preferences
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Preferred Role</label>
                        <p className="text-gray-900 font-semibold">{selectedVolunteer.assignedRole}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Preferred Shift</label>
                        <p className="text-gray-900 font-semibold">{selectedVolunteer.shiftTiming}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Experience</label>
                        <p className="text-gray-900">{selectedVolunteer.experience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Assignment Section */}
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      ✏️ Assign Role & Area
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assigned Role <span className="text-orange-600">(or keep preferred)</span>
                        </label>
                        <select
                          value={assignmentData.assignedRole}
                          onChange={(e) =>
                            setAssignmentData({ ...assignmentData, assignedRole: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Use Preferred Role: {selectedVolunteer.assignedRole}</option>
                          <option value="Crowd Management">Crowd Management</option>
                          <option value="Information Desk">Information Desk</option>
                          <option value="Medical Support">Medical Support</option>
                          <option value="Parking Management">Parking Management</option>
                          <option value="General Support">General Support</option>
                          <option value="Security">Security</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assigned Area <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={assignmentData.assignedArea}
                          onChange={(e) =>
                            setAssignmentData({ ...assignmentData, assignedArea: e.target.value })
                          }
                          placeholder="e.g., Bull Temple Road, Main Gate"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shift Timing <span className="text-orange-600">(or keep preferred)</span>
                        </label>
                        <select
                          value={assignmentData.shiftTiming}
                          onChange={(e) =>
                            setAssignmentData({ ...assignmentData, shiftTiming: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Use Preferred: {selectedVolunteer.shiftTiming}</option>
                          <option value="Morning (6AM-12PM)">Morning (6AM-12PM)</option>
                          <option value="Afternoon (12PM-6PM)">Afternoon (12PM-6PM)</option>
                          <option value="Evening (6PM-10PM)">Evening (6PM-10PM)</option>
                          <option value="Full Day">Full Day</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Assignment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Role</label>
                      <p className="text-gray-900">{selectedVolunteer.assignedRole}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Area</label>
                      <p className="text-gray-900">{selectedVolunteer.assignedArea || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Shift</label>
                      <p className="text-gray-900">{selectedVolunteer.shiftTiming}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Experience</label>
                      <p className="text-gray-900">{selectedVolunteer.experience}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedVolunteer.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedVolunteer.emergencyContact.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Relation</label>
                    <p className="text-gray-900">
                      {selectedVolunteer.emergencyContact.relation || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedVolunteer.status === 'registered' && (
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => handleStatusUpdate(selectedVolunteer._id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-semibold"
                  >
                    ✅ Approve Volunteer
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
