import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-3 border-b z-10">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-lg p-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="font-bold text-xl text-blue-700 tracking-tight">E-Gram Vikas Portal</span>
      </div>
      <div className="flex items-center gap-6">
        <select className="bg-gray-100 rounded px-2 py-1 text-sm focus:outline-none">
          <option>English</option>
          <option>मराठी</option>
        </select>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium text-gray-700">Ashish Khot</span>
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">A</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
