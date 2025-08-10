const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const transformWeatherData = (current, forecast) => {
  const { list } = forecast;
  const today = list[0];
  const offset = current.timezone;
  const now = new Date();
  const localTime = new Date(now.getTime() + offset * 1000 + now.getTimezoneOffset() * 60 * 1000);
  const icon = current.weather[0].icon;

  return {
    id: current.id,
    city: current.name,
    country: current.sys.country,
    coords: current.coord,
    time: localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    date: new Date(current.dt * 1000).toLocaleDateString(),
    day: new Date(current.dt * 1000).toLocaleDateString([], { weekday: 'long' }),
    temperature: Math.round(current.main.temp),
    iconCode: icon,
    feelsLike: Math.round(current.main.feels_like),
    minTemp: Math.round(today.main.temp_min),
    maxTemp: Math.round(today.main.temp_max),
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    windSpeed: current.wind.speed.toFixed(1),
    visibility: (current.visibility / 1000).toFixed(1) + ' km',
    hourly: list.slice(0, 8).map(item => ({
      hour: new Date(item.dt * 1000 + offset * 1000 + now.getTimezoneOffset() * 60 * 1000)
        .toLocaleTimeString([], { hour: 'numeric', hour12: false }),
      temp: Math.round(item.main.temp),
    })),
    weekly: list
      .filter((_, i) => i % 8 === 0)
      .map(item => ({
        day: new Date(item.dt * 1000).toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        temp: `${Math.round(item.main.temp_max)}/${Math.round(item.main.temp_min)}°C`,
        description: item.weather[0].description,
        iconCode: item.weather[0].icon,
      })),
  };
};

export const fetchWeatherByCityName = async city => {
  const url1 = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const res1 = await fetch(url1);
  if (!res1.ok) throw new Error(`City "${city}" not found.`);
  const current = await res1.json();

  const url2 = `${BASE_URL}/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&appid=${API_KEY}&units=metric`;
  const res2 = await fetch(url2);
  if (!res2.ok) throw new Error('Could not fetch forecast data.');
  const forecast = await res2.json();

  return transformWeatherData(current, forecast);
};

export const fetchWeatherByCoords = async ({ lat, lon }) => {
  const url1 = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const res1 = await fetch(url1);
  if (!res1.ok) throw new Error('Could not update weather data.');
  const current = await res1.json();

  const url2 = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const res2 = await fetch(url2);
  if (!res2.ok) throw new Error('Could not update forecast data.');
  const forecast = await res2.json();

  return transformWeatherData(current, forecast);
};
