import React from 'react';
import { IoReload } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import sunIcon from "../../assets/weather/sun.svg";
import fewCloudsIcon from '../../assets/weather/few-clouds.png';
import rainIcon from "../../assets/weather/humidity.svg";
import thunderstormIcon from "../../assets/weather/thunderstorm.png";
import snowIcon from "../../assets/weather/snow.png";
import mistIcon from "../../assets/weather/mist.png";
import scatteredCloudsIcon from "../../assets/weather/scattered-clouds.png";

const WeatherIcon = ({ iconCode }) => {
  const iconClasses = "h-28 w-28 lg:h-[120px] lg:w-[120px]";

  if (!iconCode) return <img src={sunIcon} alt="Sun" className={iconClasses} />;
  const code = iconCode.substring(0, 2);
  const icons = {
    '01': <img src={sunIcon} alt="Sun" className={iconClasses} />,
    '02': <img src={fewCloudsIcon} alt="Few Clouds" className={iconClasses} />,
    '03': <img src={scatteredCloudsIcon} alt="Scattered Clouds" className={iconClasses} />,
    '04': <img src={scatteredCloudsIcon} alt="Scattered Clouds" className={iconClasses} />,
    '09': <img src={rainIcon} alt="Rain" className={iconClasses} />,
    '10': <img src={rainIcon} alt="Rain" className={iconClasses} />,
    '11': <img src={thunderstormIcon} alt="Thunderstorm" className={iconClasses} />,
    '13': <img src={snowIcon} alt="Snow" className={iconClasses} />,
    '50': <img src={mistIcon} alt="Mist" className={iconClasses} />
  };
  return icons[code] || <img src={sunIcon} alt="Sun" className={iconClasses} />;
};

const LoadingSpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const WeatherCard = ({
  data,
  onDelete,
  isSelected,
  onSelect,
  onSeeMore,
  isRefreshing,
  onRefresh,
  onShowHourly,
  onShowWeekly,
  activeForecast,
  expandedLocationId,
  onToggleFavorite,
  isFavorite
}) => {
  const { city, country, time, date, day, temperature, iconCode, id, bgColor } = data;

  const cardBgColor = bgColor || '#e8e8e8';

  const cardClasses = [
    `p-4 lg:p-6 rounded-[20px] flex flex-col items-center shadow-md space-y-3 w-full lg:w-[320px] mx-auto text-gray-800 transition-all duration-300 border-2`,
    isSelected ? 'border-orange-500 scale-105' : 'border-transparent',
    isRefreshing ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
  ].join(' ');

  const isExpanded = id === expandedLocationId;

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isRefreshing) return;
    if (typeof onToggleFavorite === 'function') {
      onToggleFavorite(id);
      if (!isFavorite) {
        toast.success(`${city} added to favorites!`);
      } else {
        toast.info(`${city} removed from favorites!`);
      }
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isRefreshing) return;
    if (typeof onDelete === 'function') {
      onDelete();
      toast.warn(`${city} was deleted!`);
    }
  };

  return (
    <div
      className={cardClasses}
      style={{ backgroundColor: cardBgColor }}
      onClick={isRefreshing ? undefined : onSelect}
    >
      <div className="flex justify-between w-full text-sm">
        <span className="font-medium text-black text-[14px]">{city}</span>
        <span className="font-medium text-black text-right text-[14px]">{country}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-medium text-black text-[24px]">{time}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={e => { e.stopPropagation(); onShowHourly(id); }}
            disabled={isRefreshing}
            className={`px-3 py-1.5 lg:px-[18px] lg:py-2 lg:w-[114px] lg:h-[28px] text-xs lg:text-[10px] font-medium text-black rounded-[10px] transition-colors disabled:cursor-not-allowed ${isExpanded && activeForecast === 'hourly' ? 'bg-[#ffb36c]' : 'bg-gray-300/70 hover:bg-gray-400/50'}`}
          >
            Hourly forecast
          </button>
          <button
            onClick={e => { e.stopPropagation(); onShowWeekly(id); }}
            disabled={isRefreshing}
            className={`px-3 py-1.5 lg:px-[18px] lg:py-2 lg:w-[117px] lg:h-[28px] text-xs lg:text-[10px] font-medium text-black rounded-[10px] transition-colors disabled:cursor-not-allowed ${isExpanded && activeForecast === 'weekly' ? 'bg-[#ffb36c]' : 'bg-gray-300/70 hover:bg-gray-400/50'}`}
          >
            Weekly forecast
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full text-sm pb-4 font-medium text-black text-[14px]">
        <span>{date}</span>
        <span className="mx-2">|</span>
        <span>{day}</span>
      </div>

      <div className="py-2 lg:py-4">
        <WeatherIcon iconCode={iconCode} />
      </div>

      <p className="font-medium text-black text-5xl lg:text-[32px]">{temperature}°C</p>

      <div className="flex justify-between items-center w-full pt-4">
        <button
          onClick={e => { e.stopPropagation(); onRefresh(); }}
          disabled={isRefreshing}
          className="p-2 hover:bg-gray-300/50 rounded-full transition-colors disabled:cursor-not-allowed"
          aria-label="Refresh weather"
        >
          {isRefreshing ? <LoadingSpinnerIcon /> : <IoReload className="h-6 w-6 lg:h-[30px] lg:w-[30px]" />}
        </button>

        <button
          onClick={handleToggleFavorite}
          disabled={isRefreshing}
          aria-pressed={isFavorite}
          className="p-2 hover:bg-gray-300/50 rounded-full disabled:cursor-not-allowed"
          aria-label="Toggle favorite"
        >
          {isFavorite ? (
            <FaHeart className="h-6 w-6 lg:h-[30px] lg:w-[30px] text-red-500" />
          ) : (
            <FaRegHeart className="h-6 w-6 lg:h-[30px] lg:w-[30px] text-red-500" />
          )}
        </button>

        <button
          onClick={e => { e.stopPropagation(); onSeeMore(); }}
          disabled={isRefreshing}
          className="px-4 py-2 lg:px-[25px] lg:w-[99px] lg:h-[28px] text-sm lg:text-[10px] bg-[#ffb36c] rounded-[10px] font-medium text-black hover:bg-orange-500 transition-colors disabled:cursor-not-allowed"
        >
          See more
        </button>

        <button
          onClick={handleDelete}
          disabled={isRefreshing}
          className="p-2 hover:bg-gray-300/50 rounded-full disabled:cursor-not-allowed"
          aria-label="Delete location"
        >
          <FaRegTrashAlt className="h-6 w-6 lg:h-[30px] lg:w-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;