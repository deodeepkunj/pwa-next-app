"use client";

import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationStatus, setLocationStatus] = useState("checking");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Handle PWA installation and online/offline status
  useEffect(() => {
    // Handle PWA installation prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallBanner(false);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle PWA installation
  const handleInstallApp = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt();
      console.log("Install prompt result:", result);
      setInstallPrompt(null);
      setShowInstallBanner(false);
    }
  };

  // Check geolocation permission status
  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      return "unavailable";
    }

    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        switch (permission.state) {
          case "granted":
            setLocationStatus("granted");
            return "granted";
          case "denied":
            setLocationStatus("denied");
            return "denied";
          case "prompt":
            setLocationStatus("prompt");
            return "prompt";
          default:
            setLocationStatus("prompt");
            return "prompt";
        }
      } else {
        setLocationStatus("prompt");
        return "prompt";
      }
    } catch (error) {
      console.error("Error checking location permission:", error);
      setLocationStatus("prompt");
      return "prompt";
    }
  };

  // Get user's current location with proper permission handling
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationStatus("granted");
          resolve(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error);

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationStatus("denied");
              reject(new Error("Location access denied by user"));
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationStatus("error");
              reject(new Error("Location information unavailable"));
              break;
            case error.TIMEOUT:
              setLocationStatus("error");
              reject(new Error("Location request timed out"));
              break;
            default:
              setLocationStatus("error");
              reject(
                new Error("An unknown error occurred while retrieving location")
              );
              break;
          }
        },
        options
      );
    });
  };

  // Request location permission and get location
  const requestLocationPermission = async () => {
    setShowLocationPrompt(false);
    setLocationStatus("checking");

    try {
      const location = await getCurrentLocation();
      await fetchWeather(location);
    } catch (error) {
      console.error("Location request failed:", error);
      setError(error.message);
    }
  };

  // Handle manual location search when permission is denied
  const handleManualLocationSearch = () => {
    setShowLocationPrompt(false);
    setError("");
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.focus();
    }
  };

  // Search for location suggestions
  const searchLocations = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/weather/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.locations);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Fetch weather data for selected location
  const fetchWeather = async (location) => {
    setLoading(true);
    setError("");
    setShowSuggestions(false);

    try {
      const response = await fetch(
        `/api/weather/current?q=${encodeURIComponent(location)}`
      );
      const data = await response.json();

      if (data.success) {
        setWeather(data.weather);
      } else if (data.offline) {
        setError("You are offline. Showing cached weather data if available.");
      } else {
        setError(data.error || "Failed to fetch weather data");
      }
    } catch (err) {
      if (!isOnline) {
        setError("You are offline. Please check your internet connection.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchLocations(value);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSearchQuery(`${location.name}, ${location.country}`);
    fetchWeather(`${location.name}, ${location.country}`);
  };

  // Close suggestions when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setShowSuggestions(false);
    }
  };

  // Get weather icon animation class
  const getWeatherAnimation = (condition) => {
    const conditionLower = condition?.toLowerCase() || "";

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return "animate__animated animate__bounceIn animate__infinite animate__slower";
    }
    if (conditionLower.includes("snow")) {
      return "animate__animated animate__fadeInDown animate__infinite animate__slower";
    }
    if (conditionLower.includes("cloud")) {
      return "animate__animated animate__pulse animate__infinite animate__slower";
    }
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return "animate__animated animate__rotateIn animate__infinite animate__slower";
    }
    return "animate__animated animate__fadeIn";
  };

  // Get background class based on weather
  const getBackgroundClass = (condition) => {
    const conditionLower = condition?.toLowerCase() || "";

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return "rainy-bg";
    }
    if (conditionLower.includes("snow")) {
      return "snowy-bg";
    }
    if (conditionLower.includes("cloud")) {
      return "cloudy-bg";
    }
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return "sunny-bg";
    }
    return "default-bg";
  };

  // Initialize app with proper location permission handling
  useEffect(() => {
    const initializeApp = async () => {
      const permissionStatus = await checkLocationPermission();

      switch (permissionStatus) {
        case "granted":
          try {
            const location = await getCurrentLocation();
            await fetchWeather(location);
          } catch (error) {
            console.error("Failed to get location:", error);
            setError(error.message);
          }
          break;

        case "denied":
          setShowLocationPrompt(true);
          break;

        case "unavailable":
          setShowLocationPrompt(true);
          setError("Geolocation is not supported by your browser");
          break;

        case "prompt":
        default:
          setShowLocationPrompt(true);
          break;
      }
    };

    initializeApp();

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log(process.env.NODE_ENV);

  return (
    <div
      className={`weather-app ${weather ? getBackgroundClass(weather.condition.text) : "default-bg"}`}
    >
      <div className="container">
        {/* PWA Install Banner */}
        {showInstallBanner && (
          <div className="install-banner animate__animated animate__slideInDown">
            <div className="install-content">
              <span className="install-icon">📱</span>
              <div className="install-text">
                <strong>Install Weather App</strong>
                <p>Get quick access and offline features</p>
              </div>
              <div className="install-actions">
                <button className="install-button" onClick={handleInstallApp}>
                  Install
                </button>
                <button
                  className="install-dismiss"
                  onClick={() => setShowInstallBanner(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Offline Indicator */}
        {!isOnline && (
          <div className="offline-indicator animate__animated animate__slideInDown">
            <span className="offline-icon">📡</span>
            <span>You are offline</span>
          </div>
        )}

        <header className="header animate__animated animate__fadeInDown">
          <h1 className="title">Weather App</h1>
          <p className="subtitle">
            Get real-time weather information for any location
          </p>
        </header>

        <div className="search-container animate__animated animate__fadeInUp">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions animate__animated animate__fadeIn">
              {suggestions.map((location, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="location-name">{location.name}</span>
                  <span className="location-country">{location.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Permission Prompt */}
        {showLocationPrompt && (
          <div className="location-prompt animate__animated animate__fadeIn">
            <div className="prompt-card">
              <div className="prompt-icon">📍</div>
              <h3 className="prompt-title">
                {locationStatus === "unavailable"
                  ? "Location Not Available"
                  : locationStatus === "denied"
                    ? "Location Access Denied"
                    : "Enable Location Access"}
              </h3>
              <p className="prompt-message">
                {locationStatus === "unavailable"
                  ? "Your browser doesn't support location services. Please search for your city manually."
                  : locationStatus === "denied"
                    ? "Location access was denied. You can search for your city manually or enable location in your browser settings."
                    : "Allow location access to get weather information for your current location, or search for a city manually."}
              </p>
              <div className="prompt-actions">
                {locationStatus !== "unavailable" &&
                  locationStatus !== "denied" && (
                    <button
                      className="prompt-button primary"
                      onClick={requestLocationPermission}
                    >
                      Allow Location Access
                    </button>
                  )}
                <button
                  className="prompt-button secondary"
                  onClick={handleManualLocationSearch}
                >
                  Search Manually
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading animate__animated animate__fadeIn">
            <div className="loading-spinner"></div>
            <p>
              {locationStatus === "checking"
                ? "Getting your location..."
                : "Loading weather data..."}
            </p>
          </div>
        )}

        {error && !showLocationPrompt && (
          <div className="error animate__animated animate__shakeX">
            <p>{error}</p>
            {locationStatus === "denied" && (
              <button
                className="retry-button"
                onClick={() => setShowLocationPrompt(true)}
              >
                Try Again
              </button>
            )}
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card animate__animated animate__fadeInUp">
            <div className="weather-left">
              <div className="weather-header">
                <h2 className="location">{weather.location.name}</h2>
                <p className="region">
                  {weather.location.region}, {weather.location.country}
                </p>
              </div>

              <div className="weather-main">
                <div className="weather-icon-container">
                  <img
                    src={weather.condition.icon || "/placeholder.svg"}
                    alt={weather.condition.text}
                    className={`weather-icon ${getWeatherAnimation(weather.condition.text)}`}
                  />
                </div>

                <div className="temperature-container">
                  <span className="temperature">
                    {Math.round(weather.temp_c)}°
                  </span>
                  <span className="unit">C</span>
                </div>
              </div>

              <div className="weather-condition">
                <p className="condition-text">{weather.condition.text}</p>
              </div>
            </div>

            <div className="weather-right">
              <div className="weather-details">
                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">💨</span>
                  <div className="detail-info">
                    <span className="detail-label">Wind</span>
                    <span className="detail-value">
                      {weather.wind_kph} km/h
                    </span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">💧</span>
                  <div className="detail-info">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{weather.humidity}%</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">👁️</span>
                  <div className="detail-info">
                    <span className="detail-label">Visibility</span>
                    <span className="detail-value">{weather.vis_km} km</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">🌡️</span>
                  <div className="detail-info">
                    <span className="detail-label">Feels like</span>
                    <span className="detail-value">
                      {Math.round(weather.feelslike_c)}°C
                    </span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">🧭</span>
                  <div className="detail-info">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">
                      {weather.pressure_mb} mb
                    </span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">☀️</span>
                  <div className="detail-info">
                    <span className="detail-label">UV Index</span>
                    <span className="detail-value">{weather.uv}</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">🌬️</span>
                  <div className="detail-info">
                    <span className="detail-label">Wind Direction</span>
                    <span className="detail-value">
                      {weather.wind_dir} ({weather.wind_degree}°)
                    </span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">☁️</span>
                  <div className="detail-info">
                    <span className="detail-label">Cloud Cover</span>
                    <span className="detail-value">{weather.cloud}%</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">💧</span>
                  <div className="detail-info">
                    <span className="detail-label">Dew Point</span>
                    <span className="detail-value">
                      {Math.round(weather.dewpoint_c)}°C
                    </span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">💨</span>
                  <div className="detail-info">
                    <span className="detail-label">Wind Gust</span>
                    <span className="detail-value">
                      {weather.gust_kph} km/h
                    </span>
                  </div>
                </div>
              </div>

              <div className="last-updated">
                <p>
                  Last updated:{" "}
                  {new Date(weather.last_updated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
