import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import WeatherDisplay from './components/weather/WeatherDisplay';
import WeatherDetails from './components/weather/WeatherDetails';
import ForecastDetails from './components/weather/ForecastDetails';
import NewsSection from './components/news/NewsSection';
import NatureSection from './components/nature/NatureSection';
import Footer from './components/layout/Footer';
import SignUpModal from './components/modals/SignUpModal';
import LoginModal from './components/modals/LoginModal';
import { fetchWeatherByCityName, fetchWeatherByCoords } from './services/weatherApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullPageLoader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex justify-center items-center">
    <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);


function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [likedLocations, setLikedLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [expandedView, setExpandedView] = useState({ id: null, type: null });
  const [activeForecasts, setActiveForecasts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshingId, setRefreshingId] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  const heroInputRef = useRef(null);
  const navbarRef = useRef(null);
  const heroSectionRef = useRef(null);
  const weatherDisplayRef = useRef(null);
  const newsSectionRef = useRef(null);
  const natureSectionRef = useRef(null);

  const getUserDataKey = (email) => `weatherAppCities_${email}`;
  const getLikedDataKey = (email) => `weatherAppLikes_${email}`;

  const sortLocations = useCallback((currentLocations, currentLikedLocations) => {
    return [...currentLocations].sort((a, b) => {
      const aIsLiked = currentLikedLocations.includes(a.id);
      const bIsLiked = currentLikedLocations.includes(b.id);
      if (aIsLiked && !bIsLiked) return -1;
      if (!aIsLiked && bIsLiked) return 1;
      return 0;
    });
  }, []);

  const handleNavigation = useCallback((sectionKey) => {
    const sectionRefs = {
      hero: heroSectionRef,
      weather: weatherDisplayRef,
      news: newsSectionRef,
      nature: natureSectionRef,
    };
    const targetRef = sectionRefs[sectionKey];
    if (!targetRef?.current) return;

    if (sectionKey === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const navbarHeight = navbarRef.current?.offsetHeight || 80;
    const elementPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: elementPosition - navbarHeight - 20,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedUser = localStorage.getItem('weatherAppUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          const storedCities = localStorage.getItem(getUserDataKey(parsedUser.email));
          const storedLikes = localStorage.getItem(getLikedDataKey(parsedUser.email));
          const citiesToUpdate = storedCities ? JSON.parse(storedCities) : [];
          const likesToUpdate = storedLikes ? JSON.parse(storedLikes) : [];
          if (citiesToUpdate.length > 0) {
            toast.info("Updating weather for your saved cities...");
            const updatePromises = citiesToUpdate.map(city => fetchWeatherByCoords(city.coords).catch(() => null));
            const updatedCitiesResults = await Promise.all(updatePromises);
            const successfullyUpdatedCities = updatedCitiesResults.filter(Boolean);
            setLocations(sortLocations(successfullyUpdatedCities, likesToUpdate));
          }
          setLikedLocations(likesToUpdate);
        }
      } catch (error) {
        console.error("Failed to initialize app", error);
      }
      setIsInitialLoading(false);
    };
    initializeApp();
  }, [sortLocations]);

  useEffect(() => {
    if (!isInitialLoading && user) {
      if (locations.length > 0) {
        localStorage.setItem(getUserDataKey(user.email), JSON.stringify(locations));
      } else {
        localStorage.removeItem(getUserDataKey(user.email));
      }
    }
  }, [locations, user, isInitialLoading]);

  useEffect(() => {
    if (!isInitialLoading && user) {
      if (likedLocations.length > 0) {
        localStorage.setItem(getLikedDataKey(user.email), JSON.stringify(likedLocations));
      } else {
        localStorage.removeItem(getLikedDataKey(user.email));
      }
    }
  }, [likedLocations, user, isInitialLoading]);

  const switchToSignUp = useCallback(() => setActiveModal('signup'), []);
  const switchToLogin = useCallback(() => setActiveModal('login'), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const handleAuthSuccess = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('weatherAppUser', JSON.stringify(userData));
    const storedCities = localStorage.getItem(getUserDataKey(userData.email));
    const initialLocations = storedCities ? JSON.parse(storedCities) : [];
    const storedLikes = localStorage.getItem(getLikedDataKey(userData.email));
    const initialLikedLocations = storedLikes ? JSON.parse(storedLikes) : [];
    setLikedLocations(initialLikedLocations);
    setLocations(sortLocations(initialLocations, initialLikedLocations));
    setExpandedView({ id: null, type: null });
    closeModal();
  }, [closeModal, sortLocations]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setLocations([]);
    setLikedLocations([]);
    setSelectedLocationId(null);
    setExpandedView({ id: null, type: null });
    setActiveForecasts({});
    localStorage.removeItem('weatherAppUser');
    toast.info("You have been logged out.");
  }, []);

  const handleSearch = useCallback(async (cityQuery) => {
    if (!user) {
      toast.error("Please log in to save weather locations.");
      return;
    }

    setIsLoading(true);
    setIsFirstSearch(false);
    try {
      const weatherData = await fetchWeatherByCityName(cityQuery);

      if (locations.some(loc => loc.id === weatherData.id)) {
        toast.warn(`The location "${weatherData.city}" is already in your list.`);
      } else {
        const updatedLocations = [weatherData, ...locations];
        setLocations(sortLocations(updatedLocations, likedLocations));
        setSelectedLocationId(weatherData.id);
        toast.success(`Successfully added ${weatherData.city}!`);
        setTimeout(() => {
          weatherDisplayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  }, [locations, user, likedLocations, sortLocations]);

  const handleAddLocationClick = useCallback(() => {
    setIsFirstSearch(true);
    const inputElement = heroInputRef.current;
    if (!inputElement) return;
    
    const navbarHeight = navbarRef.current?.offsetHeight || 80;
    const inputTopPosition = inputElement.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: inputTopPosition - navbarHeight - 20,
      behavior: 'smooth'
    });

    setTimeout(() => {
      inputElement.focus();
    }, 500);
  }, []);

  const handleDeleteLocation = useCallback((locationId) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    setLikedLocations(prev => prev.filter(id => id !== locationId));
    if (selectedLocationId === locationId) setSelectedLocationId(null);
    if (expandedView.id === locationId) {
      setExpandedView({ id: null, type: null });
    }
  }, [selectedLocationId, expandedView]);

  const handleToggleLike = useCallback((locationId) => {
    const newLikedLocations = likedLocations.includes(locationId)
      ? likedLocations.filter(id => id !== locationId)
      : [locationId, ...likedLocations];
    setLikedLocations(newLikedLocations);
    setLocations(prevLocations => sortLocations(prevLocations, newLikedLocations));
  }, [likedLocations, sortLocations]);

  const handleCardClick = useCallback((locationId) => {
    setExpandedView(prev => {
      const isClosing = prev.id === locationId && prev.type === 'forecast';
      if (isClosing) {
        setSelectedLocationId(null);
        return { id: null, type: null };
      } else {
        setActiveForecasts(f => ({ ...f, [locationId]: f[locationId] || 'hourly' }));
        setSelectedLocationId(locationId);
        return { id: locationId, type: 'forecast' };
      }
    });
  }, []);

  const handleSeeMoreClick = useCallback((locationId) => {
    setExpandedView(prev => {
      const isClosing = prev.id === locationId && prev.type === 'details';
      if (isClosing) {
        setSelectedLocationId(null);
        return { id: null, type: null };
      } else {
        setSelectedLocationId(locationId);
        return { id: locationId, type: 'details' };
      }
    });
  }, []);

  const handleRefreshLocation = useCallback(async (locationId) => {
    const locationToRefresh = locations.find(loc => loc.id === locationId);
    if (!locationToRefresh) return;
    setRefreshingId(locationId);
    try {
      const updatedWeatherData = await fetchWeatherByCoords(locationToRefresh.coords);
      setLocations(prevLocations =>
        sortLocations(
          prevLocations.map(loc => loc.id === locationId ? updatedWeatherData : loc),
          likedLocations
        )
      );
      toast.success(`Weather for ${updatedWeatherData.city} has been updated!`);
    } catch (error) {
      toast.error(error.message || "Could not update weather.");
    } finally {
      setRefreshingId(null);
    }
  }, [locations, likedLocations, sortLocations]);

  const handleShowHourly = useCallback((locationId) => {
    setActiveForecasts(prev => ({ ...prev, [locationId]: 'hourly' }));
    setExpandedView({ id: locationId, type: 'forecast' });
    setSelectedLocationId(locationId);
  }, []);

  const handleShowWeekly = useCallback((locationId) => {
    setActiveForecasts(prev => ({ ...prev, [locationId]: 'weekly' }));
    setExpandedView({ id: locationId, type: 'forecast' });
    setSelectedLocationId(locationId);
  }, []);

  const expandedLocationData = locations.find(loc => loc.id === expandedView.id);
  const activeForecastForExpanded = expandedView.id ? activeForecasts[expandedView.id] : null;

  if (isInitialLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="App bg-white">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Navbar
        ref={navbarRef}
        user={user}
        onLogout={handleLogout}
        onSignUpClick={switchToSignUp}
        onLoginClick={switchToLogin}
        onNavigate={handleNavigation}
      />
      <main>
        <Hero
          ref={heroSectionRef}
          inputRef={heroInputRef}
          onSearch={handleSearch}
          isLoading={isLoading}
          isFirstSearch={isFirstSearch}
          setIsFirstSearch={setIsFirstSearch}
        />
        <WeatherDisplay
          ref={weatherDisplayRef}
          locations={locations}
          onDeleteLocation={handleDeleteLocation}
          selectedLocationId={selectedLocationId}
          onCardClick={handleCardClick}
          onSeeMoreClick={handleSeeMoreClick}
          onRefreshLocation={handleRefreshLocation}
          refreshingId={refreshingId}
          expandedView={expandedView}
          onShowHourly={handleShowHourly}
          onShowWeekly={handleShowWeekly}
          activeForecasts={activeForecasts}
          likedLocations={likedLocations}
          onToggleLike={handleToggleLike}
          onAddLocationClick={handleAddLocationClick}
        />
        {expandedView.type === 'details' && expandedLocationData && <WeatherDetails details={expandedLocationData} />}
        {expandedView.type === 'forecast' && expandedLocationData && <ForecastDetails forecastData={expandedLocationData} activeForecast={activeForecastForExpanded} />}
        <NewsSection ref={newsSectionRef} />
        <NatureSection ref={natureSectionRef} />
      </main>
      <Footer />
      <SignUpModal isOpen={activeModal === 'signup'} onClose={closeModal} onSwitchToLogin={switchToLogin} onRegisterSuccess={handleAuthSuccess} />
      <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onSwitchToSignUp={switchToSignUp} onLoginSuccess={handleAuthSuccess} />
    </div>
  );
}

export default App;