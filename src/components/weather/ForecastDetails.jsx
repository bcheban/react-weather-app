import React from 'react';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';

const ForecastDetails = ({ forecastData, activeForecast }) => {
  if (!forecastData) return null;

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {activeForecast === 'hourly' && <HourlyForecast data={forecastData.hourly} />}
        {activeForecast === 'weekly' && <WeeklyForecast data={forecastData.weekly} />}
      </div>
    </section>
  );
};

export default ForecastDetails;