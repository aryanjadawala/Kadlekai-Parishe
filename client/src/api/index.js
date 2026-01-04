// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function for API requests
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
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Vendor API
export const vendorAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/vendors${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiRequest(`/vendors/${id}`),
  
  create: (vendorData) => apiRequest('/vendors', {
    method: 'POST',
    body: JSON.stringify(vendorData),
  }),
  
  update: (id, vendorData) => apiRequest(`/vendors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vendorData),
  }),
  
  delete: (id) => apiRequest(`/vendors/${id}`, {
    method: 'DELETE',
  }),
  
  getStats: () => apiRequest('/vendors/stats'),
};

// Volunteer API
export const volunteerAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/volunteers${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiRequest(`/volunteers/${id}`),
  
  create: (volunteerData) => apiRequest('/volunteers', {
    method: 'POST',
    body: JSON.stringify(volunteerData),
  }),
  
  update: (id, volunteerData) => apiRequest(`/volunteers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(volunteerData),
  }),
  
  delete: (id) => apiRequest(`/volunteers/${id}`, {
    method: 'DELETE',
  }),
  
  getStats: () => apiRequest('/volunteers/stats'),
};

// Parking API
export const parkingAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/parking${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiRequest(`/parking/${id}`),
  
  create: (parkingData) => apiRequest('/parking', {
    method: 'POST',
    body: JSON.stringify(parkingData),
  }),
  
  update: (id, parkingData) => apiRequest(`/parking/${id}`, {
    method: 'PUT',
    body: JSON.stringify(parkingData),
  }),
  
  delete: (id) => apiRequest(`/parking/${id}`, {
    method: 'DELETE',
  }),
  
  checkIn: (id, vehicleData) => apiRequest(`/parking/${id}/checkin`, {
    method: 'POST',
    body: JSON.stringify(vehicleData),
  }),
  
  checkOut: (id, checkoutData) => apiRequest(`/parking/${id}/checkout`, {
    method: 'POST',
    body: JSON.stringify(checkoutData),
  }),
  
  getStats: () => apiRequest('/parking/stats'),
};

export default {
  vendor: vendorAPI,
  volunteer: volunteerAPI,
  parking: parkingAPI,
};
