
import React from 'react';
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8 w-full">
      <button
        type="button"
        onClick={logout}
        className="self-end mb-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Manage services, monitor activity, and view analytics.</p>
      {/* Complaints Management */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Complaints Management (View, filter, assign, update, upload proof)</div>
      {/* Certificate Applications */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Certificate Applications (Approve/reject, remarks, generate certs)</div>
      {/* Garbage Collection Management */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Garbage Collection Management (Assign routes, monitor progress)</div>
      {/* Announcements & Schemes Panel */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Announcements & Schemes Panel (Post updates)</div>
      {/* Analytics Dashboard */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Analytics Dashboard (Complaints, certificates, garbage stats, active users, export reports)</div>
    </div>
  );
};

export default AdminDashboard;
