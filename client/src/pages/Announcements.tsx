import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch announcements');
      setAnnouncements(data.announcements || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
    // Connect to Socket.IO for real-time updates
    const s = io();
    setSocket(s);
    s.on('announcement', (announcement: any) => {
      setAnnouncements(prev => [announcement, ...prev]);
    });
    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Announcements</h1>
        <p className="text-gray-600">Stay updated with the latest village announcements and schemes.</p>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        ) : (
          <ul className="divide-y divide-gray-200 mt-4">
            {announcements.length === 0 ? (
              <li className="py-2 text-gray-500">No announcements found.</li>
            ) : (
              announcements.map((a: any) => (
                <li key={a._id} className="py-2">
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-gray-700">{a.message}</div>
                  <div className="text-xs text-gray-500">Target: {a.roleTarget} {a.pinned && <span className="text-yellow-600">(Pinned)</span>}</div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Announcements;
