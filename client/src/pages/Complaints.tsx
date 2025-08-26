import React, { useEffect, useState } from 'react';

const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ category: '', description: '', location: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch complaints');
      setComplaints(data.complaints || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.category || !form.description) {
      setError('Category and description are required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit complaint');
        return;
      }
      setSuccess('Complaint submitted!');
      setForm({ category: '', description: '', location: '' });
      fetchComplaints();
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">My Complaints</h1>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="">Select category</option>
              <option value="Road">Road</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Describe your issue" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Location (optional)</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Location" />
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
          <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">Submit Complaint</button>
        </form>
        <h2 className="text-lg font-semibold mb-2">Complaint History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {complaints.length === 0 ? (
              <li className="py-2 text-gray-500">No complaints found.</li>
            ) : (
              complaints.map((c: any) => (
                <li key={c._id} className="py-2">
                  <div className="font-semibold">{c.category}</div>
                  <div className="text-gray-700">{c.description}</div>
                  <div className="text-xs text-gray-500">Status: {c.status} | {c.location}</div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Complaints;
