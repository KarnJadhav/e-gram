
import BulletinBoard from '../components/BulletinBoard';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome back, Ashish!</h1>
      <p className="text-gray-500 mb-6">Manage your village services and stay updated with the latest announcements.</p>

      <BulletinBoard />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow flex items-center p-4">
          <div className="bg-orange-100 rounded-lg p-2 mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fbbf24"/><path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Active Complaints</div>
            <div className="font-bold text-lg text-gray-800">0</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow flex items-center p-4">
          <div className="bg-green-100 rounded-lg p-2 mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#22c55e"/><path d="M12 7v6l4 2" stroke="#fff" strokeWidth="2"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Certificates</div>
            <div className="font-bold text-lg text-gray-800">0</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow flex items-center p-4">
          <div className="bg-blue-100 rounded-lg p-2 mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M8 12h8M8 16h8M8 8h8" stroke="#fff" strokeWidth="2"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Pickup Requests</div>
            <div className="font-bold text-lg text-gray-800">0</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow flex items-center p-4">
          <div className="bg-purple-100 rounded-lg p-2 mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#a78bfa"/><path d="M12 8v8" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">New Schemes</div>
            <div className="font-bold text-lg text-gray-800">0</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow group transition">
          <div className="bg-red-600 rounded-full p-2 mb-2 group-hover:scale-110 transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M12 8v8M8 12h8" stroke="#dc2626" strokeWidth="2"/></svg></div>
          <span className="font-semibold text-red-700">File Complaint</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-xl p-6 shadow group transition">
          <div className="bg-green-600 rounded-full p-2 mb-2 group-hover:scale-110 transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M12 8v8M8 12h8" stroke="#22c55e" strokeWidth="2"/></svg></div>
          <span className="font-semibold text-green-700">Apply Certificate</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-xl p-6 shadow group transition">
          <div className="bg-blue-600 rounded-full p-2 mb-2 group-hover:scale-110 transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M12 8v8M8 12h8" stroke="#2563eb" strokeWidth="2"/></svg></div>
          <span className="font-semibold text-blue-700">Request Pickup</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-xl p-6 shadow group transition">
          <div className="bg-purple-600 rounded-full p-2 mb-2 group-hover:scale-110 transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/><path d="M12 8v8M8 12h8" stroke="#a78bfa" strokeWidth="2"/></svg></div>
          <span className="font-semibold text-purple-700">View Documents</span>
        </button>
      </div>

      {/* Recent Complaints & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Recent Complaints</span>
            <a href="#" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          <div className="text-gray-400 text-sm">No complaints found. Click "File Complaint" to submit your first complaint.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Latest Announcements</span>
            <a href="#" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          <div className="text-gray-400 text-sm">No announcements available.</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
