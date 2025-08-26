import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full bg-white border-t shadow-inner py-4 px-8 flex flex-col md:flex-row items-center justify-between mt-8">
    <span className="text-gray-500 text-sm">© {new Date().getFullYear()} E-Gram Vikas Portal. All rights reserved.</span>
    <span className="text-gray-400 text-xs mt-2 md:mt-0">Empowering Villages with Digital Governance</span>
  </footer>
);

export default Footer;
