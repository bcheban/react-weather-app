import React, { useState } from 'react';
import logo from '../../assets/logo/logo.svg';
import userIcon from '../../assets/icons/user.svg';

const navItems = ['Who we are', 'Contacts', 'Menu'];

const Navbar = ({ user, onLogout, onSignUpClick, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerBgClass = isMenuOpen ? 'bg-[#f3f3f3]' : 'bg-white';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-30 transition-colors duration-300 ${headerBgClass}`}>
        <nav className="w-full max-w-[1440px] h-[80px] flex items-center justify-between mx-auto px-4 sm:px-8 lg:px-[150px]">
          <img src={logo} alt="Logo" className="w-auto h-[40px] md:h-[56px]" />
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item} className="font-medium text-xs text-black hover:text-gray-500 transition-colors">
                {item}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="font-semibold text-black">Welcome, {user.username}!</span>
                <button onClick={onLogout} className="px-4 h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center font-medium text-xs text-black hover:bg-opacity-80">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={onSignUpClick} className="w-[89px] h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center font-medium text-xs text-black hover:bg-opacity-80">
                  Sign Up
                </button>
                <button onClick={onLoginClick} className="w-[89px] h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center font-medium text-xs text-black hover:bg-opacity-80">
                  Log In
                </button>
                <div className="w-[50px] h-[50px]">
                  <img src={userIcon} alt="User" />
                </div>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 font-medium text-lg text-black">
              Menu
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" fill="black"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>
      
      {isMenuOpen && (
        <div className={`fixed top-[80px] left-0 w-full z-20 md:hidden p-6 shadow-lg ${headerBgClass}`}>
          <div className="flex flex-col gap-y-6">
            {navItems.map((item) => (
              <a href="#" key={item} onClick={() => setIsMenuOpen(false)} className="text-left font-medium text-lg text-black hover:text-gray-600">
                {item}
              </a>
            ))}
            
            <div className="border-t border-gray-300 pt-6 mt-2">
              {user ? (
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="font-semibold text-lg text-black">Welcome, {user.username}!</span>
                  <button 
                    onClick={() => { onLogout(); setIsMenuOpen(false); }} 
                    className="w-full max-w-xs px-8 py-3 bg-[#ffb36c] rounded-[10px] font-semibold text-black hover:bg-opacity-80"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <img src={userIcon} alt="User profile" className="w-16 h-16" />
                  <button 
                    onClick={() => { onSignUpClick(); setIsMenuOpen(false); }} 
                    className="w-full max-w-xs px-8 py-3 bg-[#ffb36c] rounded-[10px] font-semibold text-black hover:bg-opacity-80"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;