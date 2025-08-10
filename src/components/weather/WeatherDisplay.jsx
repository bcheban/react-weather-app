import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDisplay = ({
  locations,
  onDeleteLocation,
  onSelectLocation,
  selectedLocationId,
  onSeeMore,
  onRefreshLocation,
  refreshingId,
  onShowHourly,
  onShowWeekly,
  activeForecasts,
  expandedLocationId,
  likedLocations,
  onToggleLike
}) => {
  
  if (!locations || locations.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px] px-4">
        <p className="text-gray-500 text-center text-xl">No locations added yet.</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {locations.map(location => (
            <WeatherCard
              key={location.id}
              data={location}
              onDelete={() => onDeleteLocation(location.id)}
              isSelected={location.id === selectedLocationId}
              onSelect={() => onSelectLocation(location.id)}
              onSeeMore={() => onSeeMore(location.id)}
              onRefresh={() => onRefreshLocation(location.id)}
              isRefreshing={location.id === refreshingId}
              onShowHourly={onShowHourly}
              onShowWeekly={onShowWeekly}
              activeForecast={activeForecasts[location.id]}
              expandedLocationId={expandedLocationId}
              onToggleFavorite={onToggleLike}
              isFavorite={likedLocations.includes(location.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherDisplay;