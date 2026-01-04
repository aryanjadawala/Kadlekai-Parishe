import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { parkingAPI } from '../../api';

export default function ParkingManagement({ onUpdate }) {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'checkin', 'checkout'
  const [filterZone, setFilterZone] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    slotNumber: '',
    zone: 'Zone A',
    vehicleType: 'Any',
    status: 'available',
    vehicleNumber: '',
    driverName: '',
    driverContact: '',
    attendant: ''
  });

  useEffect(() => {
    fetchParkingSlots();
  }, [filterZone, filterStatus]);

  const fetchParkingSlots = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterZone !== 'all') filters.zone = filterZone;
      if (filterStatus !== 'all') filters.status = filterStatus;
      
      const response = await parkingAPI.getAll(filters);
      setParkingSlots(response.data);
    } catch (error) {
      console.error('Error fetching parking slots:', error);
      showMessage('error', 'Failed to fetch parking slots');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const openModal = (mode, slot = null) => {
    setModalMode(mode);
    setSelectedSlot(slot);
    
    if (mode === 'create') {
      setFormData({
        slotNumber: '',
        zone: 'Zone A',
        vehicleType: 'Any',
        status: 'available',
        vehicleNumber: '',
        driverName: '',
        driverContact: '',
        attendant: ''
      });
    } else if (mode === 'edit' && slot) {
      setFormData({
        slotNumber: slot.slotNumber,
        zone: slot.zone,
        vehicleType: slot.vehicleType,
        status: slot.status,
        vehicleNumber: slot.vehicleNumber || '',
        driverName: slot.driverName || '',
        driverContact: slot.driverContact || '',
        attendant: slot.attendant || ''
      });
    } else if ((mode === 'checkin' || mode === 'checkout') && slot) {
      setFormData({
        ...formData,
        vehicleNumber: slot.vehicleNumber || '',
        driverName: slot.driverName || '',
        driverContact: slot.driverContact || '',
        attendant: ''
      });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        await parkingAPI.create({
          slotNumber: formData.slotNumber,
          zone: formData.zone,
          vehicleType: formData.vehicleType,
          status: formData.status
        });
        showMessage('success', 'Parking slot created successfully!');
      } else if (modalMode === 'edit') {
        await parkingAPI.update(selectedSlot._id, formData);
        showMessage('success', 'Parking slot updated successfully!');
      } else if (modalMode === 'checkin') {
        await parkingAPI.checkIn(selectedSlot._id, {
          vehicleNumber: formData.vehicleNumber,
          driverName: formData.driverName,
          driverContact: formData.driverContact,
          attendant: formData.attendant
        });
        showMessage('success', 'Vehicle checked in successfully!');
      } else if (modalMode === 'checkout') {
        await parkingAPI.checkOut(selectedSlot._id);
        showMessage('success', 'Vehicle checked out successfully!');
      }
      
      closeModal();
      fetchParkingSlots();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error:', error);
      showMessage('error', error.message || 'Operation failed');
    }
  };

  const handleDelete = async (slotId) => {
    if (!window.confirm('Are you sure you want to delete this parking slot?')) return;
    
    try {
      await parkingAPI.delete(slotId);
      showMessage('success', 'Parking slot deleted successfully!');
      fetchParkingSlots();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting slot:', error);
      showMessage('error', 'Failed to delete parking slot');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-300';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'maintenance': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Message Alert */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Parking Management</h2>
        <button
          onClick={() => openModal('create')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          + Add Parking Slot
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Zone</label>
            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Zones</option>
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
              <option value="VIP Zone">VIP Zone</option>
              <option value="Two Wheeler Zone">Two Wheeler Zone</option>
              <option value="Four Wheeler Zone">Four Wheeler Zone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parking Slots Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parkingSlots.map((slot) => (
                <tr key={slot._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {slot.slotNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {slot.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {slot.vehicleType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(slot.status)}`}>
                      {slot.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {slot.vehicleNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {slot.status === 'available' && (
                      <button
                        onClick={() => openModal('checkin', slot)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Check In
                      </button>
                    )}
                    {slot.status === 'occupied' && (
                      <button
                        onClick={() => openModal('checkout', slot)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Check Out
                      </button>
                    )}
                    <button
                      onClick={() => openModal('edit', slot)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {parkingSlots.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No parking slots found. Create one to get started.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {modalMode === 'create' && 'Add New Parking Slot'}
                {modalMode === 'edit' && 'Edit Parking Slot'}
                {modalMode === 'checkin' && 'Check In Vehicle'}
                {modalMode === 'checkout' && 'Check Out Vehicle'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {(modalMode === 'create' || modalMode === 'edit') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slot Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.slotNumber}
                        onChange={(e) => setFormData({ ...formData, slotNumber: e.target.value })}
                        placeholder="e.g., A-101"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zone <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Zone A">Zone A</option>
                        <option value="Zone B">Zone B</option>
                        <option value="Zone C">Zone C</option>
                        <option value="VIP Zone">VIP Zone</option>
                        <option value="Two Wheeler Zone">Two Wheeler Zone</option>
                        <option value="Four Wheeler Zone">Four Wheeler Zone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Type
                      </label>
                      <select
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Any">Any</option>
                        <option value="Two Wheeler">Two Wheeler</option>
                        <option value="Four Wheeler">Four Wheeler</option>
                        <option value="Heavy Vehicle">Heavy Vehicle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="reserved">Reserved</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </>
                )}

                {modalMode === 'checkin' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.vehicleNumber}
                        onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                        placeholder="KA01AB1234"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.driverName}
                        onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.driverContact}
                        onChange={(e) => setFormData({ ...formData, driverContact: e.target.value })}
                        placeholder="9876543210"
                        pattern="[0-9]{10}"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attendant Name
                      </label>
                      <input
                        type="text"
                        value={formData.attendant}
                        onChange={(e) => setFormData({ ...formData, attendant: e.target.value })}
                        placeholder="Attendant name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </>
                )}

                {modalMode === 'checkout' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Slot:</strong> {selectedSlot?.slotNumber}<br />
                      <strong>Vehicle:</strong> {selectedSlot?.vehicleNumber}<br />
                      <strong>Driver:</strong> {selectedSlot?.driverName}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Are you sure you want to check out this vehicle?
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition"
                  >
                    {modalMode === 'create' && 'Create'}
                    {modalMode === 'edit' && 'Update'}
                    {modalMode === 'checkin' && 'Check In'}
                    {modalMode === 'checkout' && 'Check Out'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
