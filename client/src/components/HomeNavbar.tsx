
import React, { useState } from 'react';

const HomeNavbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-white shadow-md fixed top-0 left-0 z-20">
      <div className="flex items-center gap-2">
        <div className="bg-blue-100 rounded-lg p-2">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#2563eb"/>
            <path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 17h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-bold text-2xl text-blue-700 tracking-tight">E-Gram Vikas Portal</span>
      </div>
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-blue-800 font-semibold text-lg">
        <li>
          <a href="#about" className="hover:text-blue-600 transition">About Us</a>
        </li>
        <li>
          <a href="/register" className="hover:text-blue-600 transition">Register</a> / <a href="/login" className="hover:text-blue-600 transition">Login</a>
        </li>
        <li>
          <a href="/admin" className="hover:text-blue-600 transition">Admin</a>
        </li>
      </ul>
      {/* Hamburger for mobile/tablet */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Sidebar menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-bold text-xl text-blue-700">Menu</span>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6 text-blue-800 font-semibold text-lg">
          <li>
            <a href="#about" className="hover:text-blue-600 transition" onClick={() => setSidebarOpen(false)}>About Us</a>
          </li>
          <li>
            <a href="/register" className="hover:text-blue-600 transition" onClick={() => setSidebarOpen(false)}>Register</a> / <a href="/login" className="hover:text-blue-600 transition" onClick={() => setSidebarOpen(false)}>Login</a>
          </li>
          <li>
            <a href="/admin" className="hover:text-blue-600 transition" onClick={() => setSidebarOpen(false)}>Admin</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavbar;
