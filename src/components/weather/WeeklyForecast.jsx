import React from 'react';
import lightRainIcon from '../../assets/weather/light-rain.svg';
import fewCloudsIcon from '../../assets/weather/few-clouds.svg';
import overcastCloudsIcon from '../../assets/weather/overcast-clouds.svg';
import clearSkyIcon from '../../assets/weather/clear-sky.svg';
import scatteredCloudsIcon from '../../assets/weather/scattered-clouds.svg';

const iconMap = {
  'light rain': <img src={lightRainIcon} alt="Light Rain" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />,
  'few clouds': <img src={fewCloudsIcon} alt="Few Clouds" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />,
  'clear sky': <img src={clearSkyIcon} alt="Clear Sky" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />,
  'overcast clouds': <img src={overcastCloudsIcon} alt="Overcast Clouds" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />,
  'scattered clouds': <img src={scatteredCloudsIcon} alt="Scattered Clouds" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />,
};

const ForecastDayItem = ({ day, iconKey, temp, description }) => (
  <div className="flex items-center justify-between bg-[#d9d9d9] p-3 rounded-lg w-full xl:w-[986px] xl:h-[47px] xl:ml-[76px]">
    <p className="flex-1 text-sm xl:text-[16px] truncate pr-2 font-family-montserrat font-medium text-[16px] text-black">{day}</p>
    <div className="flex items-center justify-center space-x-2 xl:space-x-[13px]">
      {iconMap[iconKey] || <img src={clearSkyIcon} alt="Weather Icon" className="w-10 h-10 xl:w-[45px] xl:h-[45px]" />}
      <p className="text-sm xl:text-[16px] font-family-montserrat font-medium text-[16px] text-black">{temp}</p>
    </div>
    <p className="flex-1 text-sm xl:text-[16px] truncate pl-2 xl:mr-[50px] font-family-montserrat font-medium text-[16px] text-right text-black">{description}</p>
  </div>
);

const WeeklyForecast = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const forecastDataToShow = data.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 rounded-2xl shadow-md bg-[#e8e8e8] xl:w-[1200px] xl:h-[425px] xl:max-w-none xl:ml-[-152px]">
      <h3 className="text-lg mb-5 xl:mt-6 xl:ml-[76px] font-family-montserrat font-semibold text-[16px] text-black">5-day forecast</h3>
      <div className="space-y-3">
        {forecastDataToShow.map((item, index) => (
          <ForecastDayItem
            key={index}
            day={item.day}
            temp={item.temp}
            description={item.description}
            iconKey={item.description.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;