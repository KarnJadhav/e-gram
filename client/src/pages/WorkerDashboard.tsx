
import React from 'react';
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const WorkerDashboard: React.FC = () => {
  return (
    <div className="p-8 w-full">
      <button
        type="button"
        onClick={logout}
        className="self-end mb-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Worker Dashboard</h1>
      <p className="text-gray-500 mb-6">View assigned tasks and update status.</p>
      {/* Assigned Routes Map/List */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Assigned Routes Map/List (Today's collection tasks)</div>
      {/* Task Status Update */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Task Status Update (Mark as Collected/Missed/Delayed)</div>
      {/* Upload Proof */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Upload Proof (Photo after pickup)</div>
      {/* Notifications from Admin */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Notifications from Admin (Urgent messages or reassignment)</div>
      {/* Schedule Overview */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">Schedule Overview (Weekly pickup tasks)</div>
    </div>
  );
};

export default WorkerDashboard;
