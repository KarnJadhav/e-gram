import React, { useEffect, useState } from 'react';

const EducationDocs: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/digilocker/education-docs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch documents');
      setDocs(data.docs || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Education Documents</h1>
        <p className="text-gray-600">Access your educational certificates here.</p>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        ) : (
          <ul className="divide-y divide-gray-200 mt-4">
            {docs.length === 0 ? (
              <li className="py-2 text-gray-500">No documents found.</li>
            ) : (
              docs.map((d: any, idx: number) => (
                <li key={idx} className="py-2">
                  <div className="font-semibold">{d.name}</div>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">View Document</a>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationDocs;
