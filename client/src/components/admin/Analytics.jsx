import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import adminAPI from '../../api/admin';

export default function Analytics({ stats }) {
  const [footfallData, setFootfallData] = useState(null);
  const [period, setPeriod] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFootfallData();
  }, [period]);

  const fetchFootfallData = async () => {
    try {
      const response = await adminAPI.getFootfall(period);
      setFootfallData(response.data);
    } catch (error) {
      console.error('Error fetching footfall data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Footfall Analytics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Footfall Analytics</h2>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {footfallData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Footfall */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Footfall by Hour
              </h3>
              <div className="space-y-2">
                {footfallData.byHour.map((data) => (
                  <div key={data._id} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-gray-600">
                      {data._id}:00
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{
                          width: `${Math.min((data.count / Math.max(...footfallData.byHour.map(d => d.count))) * 100, 100)}%`
                        }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {data.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone Distribution */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Footfall by Zone
              </h3>
              <div className="space-y-4">
                {footfallData.byZone.map((zone, index) => {
                  const colors = ['blue', 'green', 'purple', 'pink', 'indigo'];
                  const color = colors[index % colors.length];
                  return (
                    <div key={zone._id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{zone._id}</span>
                        <span className="text-gray-900 font-semibold">{zone.count} vehicles</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div
                          className={`bg-${color}-500 h-3 rounded-full transition-all`}
                          style={{
                            width: `${(zone.count / footfallData.byZone.reduce((sum, z) => sum + z.count, 0)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Volunteer Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Shift */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Volunteers by Shift
          </h3>
          <div className="space-y-4">
            {stats.breakdown.volunteersByShift.map((shift) => {
              const percentage = (shift.count / stats.volunteers.total) * 100;
              return (
                <div key={shift._id}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {shift._id}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {shift.count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Quick Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.vendors.total}
                </p>
              </div>
              <div className="text-4xl">🏪</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Active Volunteers</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.volunteers.active}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Parking Occupancy</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.parking.occupied}/{stats.parking.total}
                </p>
              </div>
              <div className="text-4xl">🅿️</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Footfall</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.footfall.total}
                </p>
              </div>
              <div className="text-4xl">🚶</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Categories */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Vendor Category Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.breakdown.vendorsByCategory.map((category, index) => {
            const icons = {
              'Groundnuts': '🥜',
              'Food': '🍔',
              'Crafts': '🎨',
              'Clothing': '👕',
              'Religious Items': '🕉️',
              'Toys': '🧸',
              'Other': '📦'
            };
            return (
              <div
                key={category._id}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center"
              >
                <div className="text-3xl mb-2">
                  {icons[category._id] || '📦'}
                </div>
                <p className="text-sm text-gray-600 mb-1">{category._id}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {category.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
