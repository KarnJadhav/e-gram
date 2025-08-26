import React, { useEffect, useState } from 'react';

const GarbageCollection: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ route: '', date: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/garbage', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch tasks');
      setTasks(data.tasks || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.route || !form.date) {
      setError('Route and date are required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/garbage/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to request pickup');
        return;
      }
      setSuccess('Garbage pickup requested!');
      setForm({ route: '', date: '' });
      fetchTasks();
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Garbage Collection</h1>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Route</label>
            <input name="route" value={form.route} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your route" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
          <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">Request Pickup</button>
        </form>
        <h2 className="text-lg font-semibold mb-2">Pickup History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tasks.length === 0 ? (
              <li className="py-2 text-gray-500">No pickups found.</li>
            ) : (
              tasks.map((t: any) => (
                <li key={t._id} className="py-2">
                  <div className="font-semibold">Route: {t.route}</div>
                  <div className="text-gray-700">Date: {new Date(t.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">Status: {t.status}</div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GarbageCollection;
