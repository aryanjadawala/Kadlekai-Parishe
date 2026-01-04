import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ReviewReportManagement({ onUpdate }) {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'reviews') {
        const response = await fetch('http://localhost:5000/api/reviews/pending');
        const data = await response.json();
        if (data.success) setReviews(data.data);
      } else {
        const response = await fetch('http://localhost:5000/api/reports');
        const data = await response.json();
        if (data.success) setReports(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleReviewAction = async (reviewId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('success', `Review ${action} successfully`);
        fetchData();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      showMessage('error', 'Failed to update review');
    }
  };

  const handleReportAction = async (reportId, status, priority = 'medium') => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, priority, resolvedBy: 'Admin' })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('success', `Report marked as ${status}`);
        fetchData();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      showMessage('error', 'Failed to update report');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      dismissed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
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

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-2 font-medium text-sm transition-all ${
              activeTab === 'reviews'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star className="inline mr-2" size={18} />
            Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-4 px-2 font-medium text-sm transition-all ${
              activeTab === 'reports'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertCircle className="inline mr-2" size={18} />
            Reports ({reports.length})
          </button>
        </div>
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No pending reviews to approve.
            </div>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {review.vendor?.businessName || 'Unknown Vendor'}
                    </h3>
                    <p className="text-sm text-gray-500">by {review.reviewerName}</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReviewAction(review._id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReviewAction(review._id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No reports submitted yet.
            </div>
          ) : (
            reports.map((report) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {report.vendor?.businessName || 'Unknown Vendor'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Stall #{report.vendor?.stallNumber || 'N/A'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="text-red-600 mr-2 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-red-900">{report.reportType}</p>
                      <p className="text-gray-700 mt-1">{report.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Reporter:</span>
                    <span className="font-medium text-gray-900 ml-2">{report.reporterName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {report.reporterEmail && (
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium text-gray-900 ml-2">{report.reporterEmail}</span>
                    </div>
                  )}
                  {report.reporterContact && (
                    <div>
                      <span className="text-gray-500">Contact:</span>
                      <span className="font-medium text-gray-900 ml-2">{report.reporterContact}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  {report.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleReportAction(report._id, 'investigating', report.priority)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Start Investigation
                      </button>
                      <button
                        onClick={() => handleReportAction(report._id, 'resolved', report.priority)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Mark Resolved
                      </button>
                      <button
                        onClick={() => handleReportAction(report._id, 'dismissed', 'low')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                  
                  {report.status === 'investigating' && (
                    <>
                      <button
                        onClick={() => handleReportAction(report._id, 'resolved', report.priority)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Mark Resolved
                      </button>
                      <button
                        onClick={() => handleReportAction(report._id, 'dismissed', 'low')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleReportAction(report._id, 'pending', report.priority)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Move to Pending
                      </button>
                    </>
                  )}
                  
                  {(report.status === 'resolved' || report.status === 'dismissed') && (
                    <>
                      <button
                        onClick={() => handleReportAction(report._id, 'investigating', 'medium')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Reopen Investigation
                      </button>
                      <button
                        onClick={() => handleReportAction(report._id, 'pending', 'medium')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Move to Pending
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
