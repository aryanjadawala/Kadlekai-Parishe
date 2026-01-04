import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { volunteerAPI } from '../api';

export default function VolunteerProfiles() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchApprovedVolunteers();
  }, [filterRole]);

  const fetchApprovedVolunteers = async () => {
    try {
      const params = { status: 'approved' };
      if (filterRole !== 'all') {
        params.assignedRole = filterRole;
      }
      const response = await volunteerAPI.getAll(params);
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    'all',
    'Crowd Management',
    'Information Desk',
    'Medical Support',
    'Parking Management',
    'General Support',
    'Security'
  ];

  const getRoleIcon = (role) => {
    const icons = {
      'Crowd Management': '👥',
      'Information Desk': 'ℹ️',
      'Medical Support': '🏥',
      'Parking Management': '🅿️',
      'General Support': '🤝',
      'Security': '🛡️',
      'Unassigned': '📋'
    };
    return icons[role] || '👤';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Volunteer Team
          </h2>
          <p className="text-gray-600 text-lg">
            Meet the dedicated volunteers helping make Kadlekai Parishe a success
          </p>
        </motion.div>

        {/* Role Filter */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 bg-white rounded-lg p-2 shadow-md">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  filterRole === role
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role === 'all' ? 'All Roles' : role}
              </button>
            ))}
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {volunteers.map((volunteer, index) => (
            <motion.div
              key={volunteer._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {volunteer.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {volunteer.name}
              </h3>

              {/* Role Badge */}
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <span>{getRoleIcon(volunteer.assignedRole)}</span>
                  <span>{volunteer.assignedRole}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm border-t pt-4">
                {volunteer.assignedArea && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 font-medium">📍 Area:</span>
                    <span className="text-gray-700">{volunteer.assignedArea}</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium">⏰ Shift:</span>
                  <span className="text-gray-700">{volunteer.shiftTiming}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium">📊 Experience:</span>
                  <span className="text-gray-700">{volunteer.experience}</span>
                </div>
              </div>

              {/* Contact Info (Optional - only if you want to show) */}
              {volunteer.contactNumber && (
                <div className="mt-4 pt-4 border-t">
                  <a
                    href={`tel:${volunteer.contactNumber}`}
                    className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    <span>📞</span>
                    <span>Contact</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {volunteers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No volunteers found for the selected role.</p>
          </div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-2">{volunteers.length}</h3>
          <p className="text-orange-100">
            {filterRole === 'all' ? 'Total Approved Volunteers' : `Volunteers in ${filterRole}`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
