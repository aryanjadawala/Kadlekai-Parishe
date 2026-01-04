import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { parkingAPI } from '../api';

export default function ParkingStatus() {
  const [stats, setStats] = useState(null);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState('all');

  useEffect(() => {
    fetchParkingData();
    const interval = setInterval(fetchParkingData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedZone]);

  const fetchParkingData = async () => {
    try {
      const [statsData, slotsData] = await Promise.all([
        parkingAPI.getStats(),
        parkingAPI.getAll(selectedZone !== 'all' ? { zone: selectedZone } : {})
      ]);
      
      setStats(statsData.data);
      setParkingSlots(slotsData.data);
    } catch (error) {
      console.error('Error fetching parking data:', error);
    } finally {
      setLoading(false);
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
    <div className="bg-gray-50 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Live Parking Status
          </h2>
          <p className="text-gray-600">Real-time parking availability</p>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalSlots}
              </div>
              <div className="text-gray-600 mt-2">Total Slots</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-green-600">
                {stats.availableSlots}
              </div>
              <div className="text-gray-600 mt-2">Available</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-red-600">
                {stats.occupiedSlots}
              </div>
              <div className="text-gray-600 mt-2">Occupied</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-purple-600">
                {stats.occupancyRate}%
              </div>
              <div className="text-gray-600 mt-2">Occupancy Rate</div>
            </motion.div>
          </div>
        )}

        {/* Zone Filter */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-lg shadow-sm">
            {['all', 'Zone A', 'Zone B', 'Zone C', 'VIP Zone'].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-6 py-2 text-sm font-medium transition ${
                  selectedZone === zone
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${zone === 'all' ? 'rounded-l-lg' : ''} ${
                  zone === 'VIP Zone' ? 'rounded-r-lg' : ''
                } border border-gray-300`}
              >
                {zone === 'all' ? 'All Zones' : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Zone Stats */}
        {stats && stats.zoneStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.zoneStats.map((zone, index) => (
              <motion.div
                key={zone._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-3">{zone._id}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">{zone.totalSlots}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-semibold text-green-600">{zone.availableSlots}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupied:</span>
                    <span className="font-semibold text-red-600">{zone.occupiedSlots}</span>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ 
                      width: `${(zone.occupiedSlots / zone.totalSlots) * 100}%` 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Parking Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {parkingSlots.map((slot, index) => (
            <motion.div
              key={slot._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className={`p-4 rounded-lg text-center shadow-md transition-all hover:shadow-lg ${
                slot.status === 'available'
                  ? 'bg-green-100 border-2 border-green-400'
                  : slot.status === 'occupied'
                  ? 'bg-red-100 border-2 border-red-400'
                  : slot.status === 'reserved'
                  ? 'bg-yellow-100 border-2 border-yellow-400'
                  : 'bg-gray-100 border-2 border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">
                {slot.vehicleType === 'Two Wheeler' ? '🏍️' : 
                 slot.vehicleType === 'Four Wheeler' ? '🚗' : '🚙'}
              </div>
              <div className="font-bold text-lg">{slot.slotNumber}</div>
              <div className="text-xs text-gray-600 mt-1">{slot.zone}</div>
              <div className={`text-xs font-semibold mt-2 ${
                slot.status === 'available' ? 'text-green-700' :
                slot.status === 'occupied' ? 'text-red-700' :
                slot.status === 'reserved' ? 'text-yellow-700' :
                'text-gray-700'
              }`}>
                {slot.status.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>

        {parkingSlots.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No parking slots found for the selected zone.
          </div>
        )}
      </div>
    </div>
  );
}
