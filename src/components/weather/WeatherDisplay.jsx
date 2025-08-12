import React, { forwardRef } from 'react';
import WeatherCard from './WeatherCard';

const WeatherDisplay = forwardRef(({
  locations,
  onDeleteLocation,
  selectedLocationId,
  onCardClick,
  onSeeMoreClick,
  onRefreshLocation,
  refreshingId,
  onShowHourly,
  onShowWeekly,
  activeForecasts,
  expandedView,
  likedLocations,
  onToggleLike,
  onAddLocationClick
}, ref) => {
  
  if (!locations || locations.length === 0) {
    return (
      <section ref={ref} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center h-[250px] px-4 text-center">
          <p className="text-gray-500 text-xl sm:text-2xl font-family-montserrat font-medium mb-6">
            Add your first location to get started
          </p>
          <button
            onClick={onAddLocationClick}
            className="bg-[#ffb36c] py-3 px-8 rounded-lg hover:bg-orange-500 transition-colors text-lg shadow-md font-family-montserrat font-medium text-[16px] text-black"
          >
            Add Location
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {locations.map(location => (
            <WeatherCard
              key={location.id}
              data={location}
              onDelete={() => onDeleteLocation(location.id)}
              isSelected={location.id === selectedLocationId}
              onCardClick={() => onCardClick(location.id)}
              onSeeMoreClick={() => onSeeMoreClick(location.id)}
              onRefresh={() => onRefreshLocation(location.id)}
              isRefreshing={location.id === refreshingId}
              onShowHourly={onShowHourly}
              onShowWeekly={onShowWeekly}
              activeForecast={activeForecasts[location.id]}
              expandedView={expandedView}
              onToggleFavorite={onToggleLike}
              isFavorite={likedLocations.includes(location.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WeatherDisplay;