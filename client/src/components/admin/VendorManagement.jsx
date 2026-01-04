import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { vendorAPI } from '../../api';
import adminAPI from '../../api/admin';

export default function VendorManagement({ onUpdate }) {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, [filter]);

  const fetchVendors = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await vendorAPI.getAll(params);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (vendorId, status, extraData = {}) => {
    try {
      await adminAPI.updateVendorStatus(vendorId, { status, ...extraData });
      fetchVendors();
      onUpdate();
      setSelectedVendor(null);
      alert(`Vendor ${status} successfully!`);
    } catch (error) {
      alert('Error updating vendor status: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      active: 'blue',
      inactive: 'gray',
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
        {['all', 'pending', 'approved', 'rejected', 'active'].map((status) => (
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

      {/* Vendors List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor, index) => (
                <motion.tr
                  key={vendor._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {vendor.businessName}
                    </div>
                    {vendor.stallNumber && (
                      <div className="text-xs text-gray-500">
                        Stall: {vendor.stallNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.productCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{vendor.contactNumber}</div>
                    <div className="text-xs text-gray-500">{vendor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(
                        vendor.status
                      )}-100 text-${getStatusColor(vendor.status)}-800`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedVendor(vendor)}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      View
                    </button>
                    {vendor.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(vendor._id, 'approved')}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(vendor._id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {vendors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No vendors found for the selected filter.
        </div>
      )}

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Vendor Details</h2>
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="text-gray-900">{selectedVendor.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Owner Name</label>
                  <p className="text-gray-900">{selectedVendor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{selectedVendor.productCategory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact</label>
                  <p className="text-gray-900">{selectedVendor.contactNumber}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedVendor.email}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Product Description</label>
                  <p className="text-gray-900">{selectedVendor.productDescription || 'N/A'}</p>
                </div>
              </div>

              {selectedVendor.status === 'pending' && (
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => handleStatusUpdate(selectedVendor._id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedVendor._id, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    ❌ Reject
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
