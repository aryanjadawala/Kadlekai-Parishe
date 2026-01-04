import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import adminAPI from '../api/admin';
import DashboardOverview from './admin/DashboardOverview';
import VendorManagement from './admin/VendorManagement';
import VolunteerManagement from './admin/VolunteerManagement';
import Analytics from './admin/Analytics';
import ParkingManagement from './admin/ParkingManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'vendors', label: 'Vendors', icon: '🏪' },
    { id: 'volunteers', label: 'Volunteers', icon: '🙋' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview stats={stats} onRefresh={fetchDashboardStats} />;
      case 'vendors':
        return <VendorManagement onUpdate={fetchDashboardStats} />;
      case 'volunteers':
        return <VolunteerManagement onUpdate={fetchDashboardStats} />;
      case 'parking':
        return <ParkingManagement onUpdate={fetchDashboardStats} />;
      case 'analytics':
        return <Analytics stats={stats} />;
      default:
        return <DashboardOverview stats={stats} onRefresh={fetchDashboardStats} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage vendors, volunteers, and view festival analytics
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-600 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
