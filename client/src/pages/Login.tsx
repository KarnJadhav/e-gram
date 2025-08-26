import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      // Always clear previous session before login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const data = await res.json();
      if (!res.ok || !data.user || !data.token) {
        setError(data.error || "Login failed");
        return;
      }
      setSuccess("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect based on role using React Router
      const role = data.user.role;
      if (role === "Citizen") {
        navigate("/citizen/dashboard");
      } else if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Worker") {
        navigate("/worker/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Network error");
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
          <h2 className="text-2xl font-bold mb-1">E-Gram Vikas Portal</h2>
          <p className="text-gray-500 text-sm">Sign in to access your village services</p>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Username or Aadhaar</label>
          <input name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="ashish12" />
        </div>
        <div className="mb-5 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="Password"
          />
          <button type="button" className="absolute right-2 top-8 text-gray-400 hover:text-blue-600" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7Z" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#2563eb" strokeWidth="2"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-9-7-9-7a17.06 17.06 0 0 1 4.06-5.94M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .52-.13 1.01-.36 1.44" stroke="#2563eb" strokeWidth="2"/><path d="m1 1 22 22" stroke="#2563eb" strokeWidth="2"/></svg>
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-150">Sign In</button>
        <div className="text-center text-sm mt-4 text-gray-500">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
