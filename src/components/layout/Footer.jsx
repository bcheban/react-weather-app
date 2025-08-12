import React from 'react';
import logo from '../../assets/logo/logo.svg';
import instagramIcon from '../../assets/socials/instagram.svg'
import facebookIcon from '../../assets/socials/facebook.svg'
import whatsappIcon from '../../assets/socials/whatsapp.svg'

const Footer = () => {
  return (
    <footer className="bg-[#FFB36C] text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-start gap-8 md:hidden">
          <div className="flex-shrink-0 pt-1">
            <img src={logo} alt="Logo" width="82" height="56" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base mb-1 font-family-montserrat-alternates font-medium text-[12px] text-black">Address</h3>
              <p className="text-xs font-family-montserrat-alternates font-medium text-[8px] text-black">Svobody str. 35</p>
              <p className="text-xs font-family-montserrat-alternates font-medium text-[8px] text-black">Kyiv</p>
              <p className="text-xs font-family-montserrat-alternates font-medium text-[8px] text-black">Ukraine</p>
            </div>
            <div>
              <h3 className="text-base mb-2 font-family-montserrat-alternates font-medium text-[12px] text-black">Contact us</h3>
              <div className="flex items-center space-x-3">
                <a href="#" aria-label="Instagram" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                  <img src={instagramIcon} className="w-[40.69px] h-[40px]"/>
                </a>
                <a href="#" aria-label="Facebook" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                  <img src={facebookIcon} className="w-[40px] h-[40px]"/>
                </a>
                <a href="#" aria-label="WhatsApp" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                  <img src={whatsappIcon} className="w-[40px] h-[40px]"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="ml-[-10px]">
            <img src={logo} alt="Logo" width="82" height="56"/>
          </div>
          <div className="text-left mr-[600px]">
            <h3 className="text-lg mb-2 font-family-montserrat-alternates font-medium text-[16px] text-black">Address</h3>
            <p className="mb-2 font-family-montserrat-alternates font-medium text-[12px] text-black">Svobody str. 35</p>
            <p className="mb-2 font-family-montserrat-alternates font-medium text-[12px] text-black">Kyiv</p>
            <p className="mb-2 font-family-montserrat-alternates font-medium text-[12px] text-black">Ukraine</p>
          </div>
          <div className="text-left ml-[-600px] mr-[600px]">
            <h3 className="text-lg mb-2 font-family-montserrat-alternates font-medium text-[16px] text-black">Contact us</h3>
            <div className="flex items-center space-x-3">
              <a href="#" aria-label="Instagram" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                <img src={instagramIcon} className="w-[40.69px] h-[40px]"/>
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                <img src={facebookIcon} className="w-[40px] h-[40px]"/>
              </a>
              <a href="#" aria-label="WhatsApp" className="rounded-full p-2 flex items-center justify-center hover:opacity-80 transition">
                <img src={whatsappIcon} className="w-[40px] h-[40px]"/>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;