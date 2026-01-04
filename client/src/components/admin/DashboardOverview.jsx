import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardOverview({ stats, onRefresh }) {
  if (!stats) {
    return <div>Loading...</div>;
  }

  const statCards = [
    {
      title: 'Total Vendors',
      value: stats.vendors.total,
      subtitle: `${stats.vendors.pending} pending approval`,
      color: 'blue',
      icon: '🏪'
    },
    {
      title: 'Total Volunteers',
      value: stats.volunteers.total,
      subtitle: `${stats.volunteers.active} active`,
      color: 'green',
      icon: '🙋'
    },
    {
      title: 'Parking Slots',
      value: stats.parking.occupied,
      subtitle: `of ${stats.parking.total} occupied`,
      color: 'purple',
      icon: '🅿️'
    },
    {
      title: 'Today\'s Footfall',
      value: stats.footfall.today,
      subtitle: `${stats.footfall.total} total visits`,
      color: 'orange',
      icon: '👥'
    },
  ];

  const pendingCards = [
    {
      title: 'Pending Vendors',
      count: stats.vendors.pending,
      color: 'yellow',
      icon: '⏳'
    },
    {
      title: 'Pending Volunteers',
      count: stats.volunteers.pending,
      color: 'yellow',
      icon: '⏳'
    },
    {
      title: 'Approved Vendors',
      count: stats.vendors.approved,
      color: 'green',
      icon: '✅'
    },
    {
      title: 'Approved Volunteers',
      count: stats.volunteers.approved,
      color: 'green',
      icon: '✅'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`text-4xl`}>{stat.icon}</div>
              <div className={`text-3xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </div>
            </div>
            <h3 className="text-gray-700 font-semibold mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-500">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Pending Approvals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Approval Status</h2>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            🔄 Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pendingCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.count}</p>
                </div>
                <div className="text-3xl">{card.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendors by Category */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Vendors by Category</h3>
          <div className="space-y-3">
            {stats.breakdown.vendorsByCategory.map((cat) => (
              <div key={cat._id} className="flex items-center justify-between">
                <span className="text-gray-700">{cat._id}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(cat.count / stats.vendors.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 w-8 text-right">
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteers by Role */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Volunteers by Role</h3>
          <div className="space-y-3">
            {stats.breakdown.volunteersByRole.map((role) => (
              <div key={role._id} className="flex items-center justify-between">
                <span className="text-gray-700">{role._id}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(role.count / stats.volunteers.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 w-8 text-right">
                    {role.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
