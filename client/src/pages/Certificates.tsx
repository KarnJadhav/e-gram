import React, { useEffect, useState } from 'react';

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({ type: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/certificates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch certificates');
      setCertificates(data.certificates || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.type) {
      setError('Certificate type is required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to apply for certificate');
        return;
      }
      setSuccess('Certificate application submitted!');
      setForm({ type: '' });
      fetchCertificates();
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Certificates</h1>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Certificate Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="">Select type</option>
              <option value="Birth">Birth</option>
              <option value="Death">Death</option>
              <option value="Residence">Residence</option>
              <option value="Income">Income</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
          <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">Apply for Certificate</button>
        </form>
        <h2 className="text-lg font-semibold mb-2">Certificate History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {certificates.length === 0 ? (
              <li className="py-2 text-gray-500">No certificates found.</li>
            ) : (
              certificates.map((c: any) => (
                <li key={c._id} className="py-2">
                  <div className="font-semibold">{c.type}</div>
                  <div className="text-gray-700">Status: {c.status}</div>
                  {c.fileUrl && (
                    <a href={c.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">Download Certificate</a>
                  )}
                  {c.remarks && (
                    <div className="text-xs text-gray-500">Remarks: {c.remarks}</div>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Certificates;
