import React, { useState } from 'react';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    aadhaar: '',
    mobile: '',
    username: '',
    password: '',
    role: 'Citizen',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Basic validation
    if (!form.fullName || !form.aadhaar || !form.mobile || !form.username || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setError('Aadhaar number must be 12 digits.');
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError('Mobile number must be 10 digits.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: form.aadhaar,
          name: form.fullName,
          username: form.username,
          mobile: form.mobile,
          password: form.password,
          role: form.role
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <button
        type="button"
        onClick={() => window.location.href = '/'}
        className="self-start mt-6 ml-6 mb-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
      >
        &larr; Go Back
      </button>
      <form
        className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-md"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 rounded-lg p-3 mb-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Register for E-Gram Vikas Portal</p>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your full name" />
        </div>
        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
            <input name="aadhaar" value={form.aadhaar} onChange={handleChange} maxLength={12} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="XXXXXXXXXXXX" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} maxLength={10} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="XXXXXXXXXX" />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Choose a username" />
        </div>
        <div className="mb-3 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="Create a password"
          />
          <button type="button" className="absolute right-2 top-8 text-gray-400 hover:text-blue-600" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7Z" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#2563eb" strokeWidth="2"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-9-7-9-7a17.06 17.06 0 0 1 4.06-5.94M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .52-.13 1.01-.36 1.44" stroke="#2563eb" strokeWidth="2"/><path d="m1 1 22 22" stroke="#2563eb" strokeWidth="2"/></svg>
            )}
          </button>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="Citizen">Citizen</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-150">Create Account</button>
        <div className="text-center text-sm mt-4 text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
