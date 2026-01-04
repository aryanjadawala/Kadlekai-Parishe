// Admin API functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, redirect to login
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin-login';
      }
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const adminAPI = {
  // Dashboard stats
  getStats: () => apiRequest('/admin/stats'),
  
  // Pending approvals
  getPending: () => apiRequest('/admin/pending'),
  
  // Recent activities
  getActivities: () => apiRequest('/admin/activities'),
  
  // Footfall analytics
  getFootfall: (period = 'today') => 
    apiRequest(`/admin/footfall?period=${period}`),
  
  // Update vendor status
  updateVendorStatus: (id, statusData) => 
    apiRequest(`/admin/vendors/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),
  
  // Update volunteer status
  updateVolunteerStatus: (id, statusData) => 
    apiRequest(`/admin/volunteers/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),
};

export default adminAPI;
