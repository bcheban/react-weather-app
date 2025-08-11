import React from 'react';
import visibilityIcon from "../../assets/weather/visibility.svg";
import windIcon from "../../assets/weather/wind.svg";
import pressureIcon from "../../assets/weather/pressure.svg";
import hotIcon from "../../assets/weather/hot-temp.svg";
import coldIcon from "../../assets/weather/cold-temp.png";
import humidityIcon from "../../assets/weather/humidity.svg";

const FeelsLikeIcon = ({ temp }) => {
  const iconClasses = "w-16 h-16 xl:w-[85px] xl:h-[85px]";
  return temp >= 18 ? (
    <img src={hotIcon} alt="Hot" className={iconClasses} />
  ) : (
    <img src={coldIcon} alt="Cold" className={iconClasses} />
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="p-4 flex flex-col items-center justify-between text-center space-y-2 rounded-[10px] bg-[#d9d9d9] min-h-[190px] xl:h-[217px]">
    <p className="text-sm xl:text-[16px] font-family-montserrat font-medium text-[16px] text-center text-black">{label}</p>
    <p className="text-2xl xl:text-[32px] font-family-montserrat font-medium text-[32px] text-center text-black">{value}</p>
    <div className="pt-2">{icon}</div>
  </div>
);

const WeatherDetails = ({ details }) => {
  if (!details) return null;

  const weatherData = [
    {
      label: "Feels like",
      value: `${details.feelsLike}°C`,
      icon: <FeelsLikeIcon temp={details.feelsLike} />,
    },
    {
      label: "Min / Max °C",
      isSpecial: true,
    },
    {
      label: "Humidity",
      value: `${details.humidity}%`,
      icon: <img
          src={humidityIcon}
          alt="Humidity"
          className="w-16 h-16 xl:w-[85px] xl:h-[85px]"
        />,
    },
    {
      label: "Pressure",
      value: `${details.pressure} Pa`,
      icon: (
        <img
          src={pressureIcon}
          alt="Pressure"
          className="w-16 h-16 xl:w-[85px] xl:h-[85px]"
        />
      ),
    },
    {
      label: "Wind speed",
      value: `${details.windSpeed} m/s`,
      icon: <img src={windIcon} alt="Wind" className="w-16 h-16 xl:w-[85px] xl:h-[85px]" />,
    },
    {
      label: "Visibility",
      value: details.visibility,
      icon: <img src={visibilityIcon} alt="Visibility" className="w-16 h-16 xl:w-[85px] xl:h-[85px]" />,
    },
  ];

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto bg-[#e8e8e8] p-4 sm:p-6 rounded-2xl xl:w-[1216px] xl:max-w-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {weatherData.map((item, i) =>
            item.isSpecial ? (
              <div
                key={i}
                className="bg-[#d9d9d9] rounded-[10px] p-4 flex flex-col items-center justify-center text-center space-y-2 min-h-[190px] xl:h-[217px]"
              >
                <p className="text-sm xl:text-[16px] font-family-montserrat font-medium text-[16px] text-center text-black">Min °C</p>
                <p className="text-2xl xl:text-[32px] font-family-montserrat font-medium text-[32px] text-center text-black">
                  {details.minTemp}°C
                </p>
                <p className="text-sm mt-2 xl:text-[16px] font-family-montserrat font-medium text-[16px] text-center text-black">Max °C</p>
                <p className="text-2xl xl:text-[32px] font-family-montserrat font-medium text-[32px] text-center text-black">
                  {details.maxTemp}°C
                </p>
              </div>
            ) : (
              <DetailItem key={i} {...item} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherDetails;
