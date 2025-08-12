import React, { useState, useEffect, forwardRef } from 'react';
import heroBg from '../../assets/bg/hero-bg.jpg';
import { FaSearch } from "react-icons/fa";

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const getDayWithSuffix = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
};

const Hero = forwardRef(({ onSearch, isLoading, isFirstSearch, setIsFirstSearch, inputRef }, ref) => {
  const [query, setQuery] = useState('');
  
  const [currentDate, setCurrentDate] = useState({
    monthYear: '',
    day: ''
  });

  useEffect(() => {
    const date = new Date();
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayWithSuffix = getDayWithSuffix(date.getDate());

    setCurrentDate({
      monthYear: monthYear,
      day: `${dayOfWeek}, ${dayWithSuffix}`,
    });
  }, []);
  
  const handleInputChange = (e) => {
    if (isFirstSearch) {
      setIsFirstSearch(false);
    }
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch(query);
    setQuery('');
  };

  return (
    <section
      ref={ref}
      className="h-screen min-h-[650px] w-full bg-cover bg-center flex flex-col justify-center items-center text-white p-4 sm:p-10 relative pt-[80px]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center space-y-12">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-family-montserrat font-semibold text-[40px] text-white">
          Weather dashboard
        </h1>

        <div className="md:hidden flex items-start w-full max-w-xs mx-auto gap-4">
          <div className="w-px bg-white self-stretch" />
          <div className="flex flex-col items-start text-left gap-y-5">
            <p className="text-lg font-family-montserrat font-medium text-[10px] text-white">
              Create your personal list of<br></br> favorite cities and always<br></br> be aware of the weather.
            </p>
            <div className="text-lg font-family-montserrat font-medium text-[10px] text-white">
              <p>{currentDate.monthYear}</p>
              <p>{currentDate.day}</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center space-x-8 mr-[100px]">
          <p className="max-w-xs text-lg font-family-montserrat font-medium text-[24px] text-right text-white">
            Create your personal list of favorite cities and always be aware of the weather.
          </p>
          <div className="border-l-2 border-solid border-white h-[120px]" />
          <div className="text-lg text-left font-family-montserrat font-medium text-[24px] text-white">
            <p>{currentDate.monthYear}</p>
            <p>{currentDate.day}</p>
          </div>
        </div>
        
        <div className="relative w-full max-w-xs md:max-w-[714px] flex justify-center">
          
          {isFirstSearch && (
            <div className="absolute -top-14 w-max bg-gray-800 text-white text-md rounded-md py-2 px-4 shadow-lg animate-bounce">
              Add your first location here!
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '10px solid rgb(31 41 55)',
                }}
              />
            </div>
          )}

          <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-xs md:max-w-none md:w-auto flex mt-5"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search location..."
              className="w-full md:w-[650px] h-[42px] p-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#ffb36c] disabled:bg-gray-300 bg-[#d9d9d9] font-family-montserrat font-medium text-[14px] text-[#000]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-[64px] h-[42px] bg-[#ffb36c] rounded-r-lg hover:bg-opacity-90 transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Search"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : <FaSearch className="text-black w-[25px] h-[25px]" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Hero;