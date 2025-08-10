import React from 'react';
import logo from '../../assets/logo/logo.svg';

const InstagramIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.89-5.451 0-9.887 4.424-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.474.823-1.04 3.833 3.821-1.045.872.489z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#FFB36C] text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* --- ВЕРСІЯ ДЛЯ МОБІЛЬНИХ --- */}
        <div className="flex flex-row items-start gap-8 md:hidden">
          <div className="flex-shrink-0 pt-1">
            <img src={logo} alt="Logo" width="82" height="56" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-bold text-black mb-1">Address</h3>
              <p className="text-xs font-medium text-black">Svobody str. 35</p>
              <p className="text-xs font-medium text-black">Kyiv</p>
              <p className="text-xs font-medium text-black">Ukraine</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-black mb-2">Contact us</h3>
              <div className="flex items-center space-x-3">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 p-2 flex items-center justify-center hover:opacity-80 transition">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#1877F2] p-2 flex items-center justify-center hover:opacity-80 transition">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-[#25D366] p-2 flex items-center justify-center hover:opacity-80 transition">
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="ml-[-10px]">
            <img src={logo} alt="Logo" width="82" height="56" className=""/>
          </div>
          <div className="text-left mr-[600px]">
            <h3 className="text-lg mb-2 font-medium text-[14px] text-black">Address</h3>
            <p className="text-sm font-medium text-[10px] text-black">Svobody str. 35</p>
            <p className="text-sm font-medium text-[10px] text-black">Kyiv</p>
            <p className="text-sm font-medium text-[10px] text-black">Ukraine</p>
          </div>
          <div className="text-left ml-[-600px] mr-[600px]">
            <h3 className="text-lg mb-2 font-medium text-[14px] text-black">Contact us</h3>
            <div className="flex items-center space-x-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 p-2 flex items-center justify-center hover:opacity-80 transition">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#1877F2] p-2 flex items-center justify-center hover:opacity-80 transition">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-[#25D366] p-2 flex items-center justify-center hover:opacity-80 transition">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;