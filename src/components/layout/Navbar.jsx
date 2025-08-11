import React, { useState, forwardRef } from 'react';
import logo from '../../assets/logo/logo.svg';
import userIcon from '../../assets/icons/user.svg';

const navItems = [
  { name: 'Weather', key: 'weather' },
  { name: 'News', key: 'news' },
  { name: 'Nature', key: 'nature' }
];

const Navbar = forwardRef(({ user, onLogout, onSignUpClick, onLoginClick, onNavigate }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerBgClass = isMenuOpen ? 'bg-[#f3f3f3]' : 'bg-white';

  const handleNavClick = (sectionKey) => {
    if (typeof onNavigate === 'function') {
      onNavigate(sectionKey);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header ref={ref} className={`fixed top-0 left-0 w-full z-30 transition-colors duration-300 ${headerBgClass}`}>
        <nav className="w-full max-w-[1440px] h-[80px] flex items-center justify-between mx-auto px-4 sm:px-8 lg:px-[150px]">
          <button onClick={() => handleNavClick('hero')} className="cursor-pointer">
            <img src={logo} alt="Logo" className="w-auto h-[40px] md:h-[56px]" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.key} 
                onClick={() => handleNavClick(item.key)}
                className="font-family-montserrat-alternates font-medium text-xs text-black hover:text-[#ffb36c] transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="font-family-montserrat font-medium text-black">Welcome, {user.username}!</span>
                <button onClick={onLogout} className="px-4 h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center text-xs hover:bg-opacity-80 font-family-montserrat-alternates font-medium text-[12px] text-black">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={onSignUpClick} className="w-[89px] h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center font-medium text-xs text-black hover:bg-opacity-80 font-family-montserrat-alternates">
                  Sign Up
                </button>
                <button onClick={onLoginClick} className="w-[89px] h-[35px] bg-[#ffb36c] rounded-[10px] flex items-center justify-center font-medium text-xs text-black hover:bg-opacity-80 font-family-montserrat-alternates">
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
              <button 
                key={item.key} 
                onClick={() => handleNavClick(item.key)} 
                className="text-left hover:text-[#ffb36c] font-medium text-[10px] text-black font-family-montserrat"
              >
                {item.name}
              </button>
            ))}
            
            <div className="border-t border-gray-300 pt-6 mt-2">
              {user ? (
                <div className="flex flex-col items-center text-center gap-4">
                  <span className="text-lg  font-family-montserrat font-medium text-black">Welcome, {user.username}!</span>
                  <button 
                    onClick={() => { onLogout(); setIsMenuOpen(false); }} 
                    className="w-full max-w-xs px-8 py-3 bg-[#ffb36c] rounded-[10px] hover:bg-opacity-80 font-family-montserrat-alternates font-normal text-[10px] text-black"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <img src={userIcon} alt="User profile" className="w-16 h-16" />
                  <button 
                    onClick={() => { onSignUpClick(); setIsMenuOpen(false); }} 
                    className="w-full max-w-xs px-8 py-3 bg-[#ffb36c] rounded-[10px] hover:bg-opacity-80 font-family-montserrat-alternates font-normal text-[10px] text-black"
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
});

export default Navbar;