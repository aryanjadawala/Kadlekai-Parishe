import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vendorAPI } from '../api';
import { Search, Star, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendorReviews, setVendorReviews] = useState({});

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
    reviewerName: '',
    reviewerEmail: ''
  });

  const [reportForm, setReportForm] = useState({
    reportType: 'Quality Issue',
    description: '',
    reporterName: '',
    reporterEmail: '',
    reporterContact: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    'all', 'Groundnuts', 'Food', 'Bangles', 'Toys', 
    'Wooden Works', 'Decorative Items', 'Handicrafts', 
    'Clothing', 'Religious Items', 'Other'
  ];

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [searchTerm, selectedCategory, vendors]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.getAll();
      const approvedVendors = response.data.filter(v => v.status === 'approved' || v.status === 'active');
      setVendors(approvedVendors);
      
      // Fetch reviews for all vendors
      approvedVendors.forEach(vendor => fetchVendorReviews(vendor._id));
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorReviews = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/vendor/${vendorId}`);
      const data = await response.json();
      if (data.success) {
        setVendorReviews(prev => ({
          ...prev,
          [vendorId]: {
            reviews: data.data,
            averageRating: parseFloat(data.averageRating),
            count: data.count
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const filterVendors = () => {
    let filtered = vendors;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(v => v.productCategory === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(v => 
        v.businessName.toLowerCase().includes(term) ||
        v.name.toLowerCase().includes(term) ||
        v.stallNumber?.toLowerCase().includes(term) ||
        v.productCategory.toLowerCase().includes(term) ||
        v.productDescription?.toLowerCase().includes(term)
      );
    }

    setFilteredVendors(filtered);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/vendor/${selectedVendor._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm)
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('success', 'Review submitted successfully!');
        setShowReviewModal(false);
        setReviewForm({ rating: 5, comment: '', reviewerName: '', reviewerEmail: '' });
        // Refresh vendor reviews
        fetchVendorReviews(selectedVendor._id);
      }
    } catch (error) {
      showMessage('error', 'Failed to submit review');
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/reports/vendor/${selectedVendor._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm)
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('success', 'Report submitted! Admin will review it shortly.');
        setShowReportModal(false);
        setReportForm({
          reportType: 'Quality Issue',
          description: '',
          reporterName: '',
          reporterEmail: '',
          reporterContact: ''
        });
      }
    } catch (error) {
      showMessage('error', 'Failed to submit report');
    }
  };

  const openReviewModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowReviewModal(true);
  };

  const openReportModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowReportModal(true);
  };

  const openVendorModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorModal(true);
  };

  const getStarRating = (vendorId) => {
    const reviewData = vendorReviews[vendorId];
    if (!reviewData || reviewData.count === 0) return null;
    
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={star <= Math.round(reviewData.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {reviewData.averageRating} ({reviewData.count} {reviewData.count === 1 ? 'review' : 'reviews'})
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Message Alert */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Explore Vendors</h1>
          <p className="text-gray-600 text-lg">
            Discover amazing stalls at Kadlekai Parishe
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by stall name, ID, vendor name, or product..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing <strong>{filteredVendors.length}</strong> {filteredVendors.length === 1 ? 'vendor' : 'vendors'}
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openVendorModal(vendor)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                <img
                  src={vendor.productPhoto}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Product+Image';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                    {vendor.productCategory}
                  </span>
                </div>

                {/* Business Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {vendor.businessName}
                </h3>

                {/* Rating */}
                {getStarRating(vendor._id)}

                {/* Vendor Details */}
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  {vendor.stallNumber && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-orange-600" />
                      <span>Stall #{vendor.stallNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-600" />
                    <span>{vendor.contactNumber}</span>
                  </div>
                </div>

                {/* Product Description */}
                {vendor.productDescription && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {vendor.productDescription}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openReviewModal(vendor);
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    <Star size={16} />
                    Review
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openReportModal(vendor);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    <AlertCircle size={16} />
                    Report
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No vendors found matching your search.</p>
          </div>
        )}

        {/* Review Modal */}
        <AnimatePresence>
          {showReviewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Write a Review
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For <strong>{selectedVendor?.businessName}</strong>
                  </p>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star
                              size={32}
                              className={star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="Share your experience..."
                        required
                        maxLength={500}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">{reviewForm.comment.length}/500 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={reviewForm.reviewerName}
                        onChange={(e) => setReviewForm({ ...reviewForm, reviewerName: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={reviewForm.reviewerEmail}
                        onChange={(e) => setReviewForm({ ...reviewForm, reviewerEmail: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(false)}
                        className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Report Modal */}
        <AnimatePresence>
          {showReportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Report an Issue
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For <strong>{selectedVendor?.businessName}</strong>
                  </p>

                  <form onSubmit={handleSubmitReport} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={reportForm.reportType}
                        onChange={(e) => setReportForm({ ...reportForm, reportType: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Quality Issue">Quality Issue</option>
                        <option value="Overcharging">Overcharging</option>
                        <option value="Misbehavior">Misbehavior</option>
                        <option value="Hygiene Issue">Hygiene Issue</option>
                        <option value="Fraud">Fraud</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={reportForm.description}
                        onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                        placeholder="Please describe the issue in detail..."
                        required
                        maxLength={1000}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">{reportForm.description.length}/1000 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={reportForm.reporterName}
                        onChange={(e) => setReportForm({ ...reportForm, reporterName: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={reportForm.reporterEmail}
                        onChange={(e) => setReportForm({ ...reportForm, reporterEmail: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={reportForm.reporterContact}
                        onChange={(e) => setReportForm({ ...reportForm, reporterContact: e.target.value })}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowReportModal(false)}
                        className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                      >
                        Submit Report
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Vendor Details Modal */}
        <AnimatePresence>
          {showVendorModal && selectedVendor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowVendorModal(false)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="h-64 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                    <img
                      src={selectedVendor.productPhoto}
                      alt={selectedVendor.businessName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Product+Image';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-4 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full">
                        {selectedVendor.productCategory}
                      </span>
                    </div>

                    {/* Business Name */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedVendor.businessName}
                    </h2>

                    {/* Rating */}
                    <div className="mb-4">
                      {getStarRating(selectedVendor._id)}
                    </div>

                    {/* Vendor Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                      {selectedVendor.stallNumber && (
                        <div>
                          <span className="text-sm text-gray-500">Stall Number</span>
                          <p className="font-semibold text-gray-900">{selectedVendor.stallNumber}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm text-gray-500">Contact</span>
                        <p className="font-semibold text-gray-900">{selectedVendor.contactNumber}</p>
                      </div>
                      {selectedVendor.email && (
                        <div className="col-span-2">
                          <span className="text-sm text-gray-500">Email</span>
                          <p className="font-semibold text-gray-900">{selectedVendor.email}</p>
                        </div>
                      )}
                    </div>

                    {/* Product Description */}
                    {selectedVendor.productDescription && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-700">{selectedVendor.productDescription}</p>
                      </div>
                    )}

                    {/* Reviews Section */}
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Customer Reviews
                        {vendorReviews[selectedVendor._id] && vendorReviews[selectedVendor._id].count > 0 && (
                          <span className="text-sm font-normal text-gray-500 ml-2">
                            ({vendorReviews[selectedVendor._id].count} {vendorReviews[selectedVendor._id].count === 1 ? 'review' : 'reviews'})
                          </span>
                        )}
                      </h3>

                      {/* Add Review Button */}
                      <button
                        onClick={() => {
                          setShowVendorModal(false);
                          openReviewModal(selectedVendor);
                        }}
                        className="mb-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                      >
                        <Star size={18} />
                        Write a Review
                      </button>

                      {/* Reviews List */}
                      {vendorReviews[selectedVendor._id] && vendorReviews[selectedVendor._id].reviews.length > 0 ? (
                        <div className="space-y-4">
                          {vendorReviews[selectedVendor._id].reviews.map((review) => (
                            <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                                  <div className="flex mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        size={16}
                                        className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No reviews yet. Be the first to review!</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-2">
                      <button
                        onClick={() => {
                          setShowVendorModal(false);
                          openReportModal(selectedVendor);
                        }}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                      >
                        <AlertCircle size={16} />
                        Report an Issue
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
