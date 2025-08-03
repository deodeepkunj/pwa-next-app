"use client"

import { useState, useEffect } from "react"
import "animate.css"

export default function WeatherApp() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Search for location suggestions
  const searchLocations = async (query) => {
    if (query.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await fetch(`/api/weather/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        setSuggestions(data.locations)
        setShowSuggestions(true)
      }
    } catch (err) {
      console.error("Search error:", err)
    }
  }

  // Fetch weather data for selected location
  const fetchWeather = async (location) => {
    setLoading(true)
    setError("")
    setShowSuggestions(false)

    try {
      const response = await fetch(`/api/weather/current?q=${encodeURIComponent(location)}`)
      const data = await response.json()

      if (data.success) {
        setWeather(data.weather)
      } else {
        setError(data.error || "Failed to fetch weather data")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    searchLocations(value)
  }

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSearchQuery(`${location.name}, ${location.country}`)
    fetchWeather(`${location.name}, ${location.country}`)
  }

  // Get weather icon animation class
  const getWeatherAnimation = (condition) => {
    const conditionLower = condition?.toLowerCase() || ""

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return "animate__animated animate__bounceIn animate__infinite animate__slower"
    }
    if (conditionLower.includes("snow")) {
      return "animate__animated animate__fadeInDown animate__infinite animate__slower"
    }
    if (conditionLower.includes("cloud")) {
      return "animate__animated animate__pulse animate__infinite animate__slower"
    }
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return "animate__animated animate__rotateIn animate__infinite animate__slower"
    }
    return "animate__animated animate__fadeIn"
  }

  // Get background class based on weather
  const getBackgroundClass = (condition) => {
    const conditionLower = condition?.toLowerCase() || ""

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return "rainy-bg"
    }
    if (conditionLower.includes("snow")) {
      return "snowy-bg"
    }
    if (conditionLower.includes("cloud")) {
      return "cloudy-bg"
    }
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return "sunny-bg"
    }
    return "default-bg"
  }

  // Load default weather on component mount
  useEffect(() => {
    fetchWeather("London")
  }, [])

  return (
    <div className={`weather-app ${weather ? getBackgroundClass(weather.condition.text) : "default-bg"}`}>
      <div className="container">
        <header className="header animate__animated animate__fadeInDown">
          <h1 className="title">Weather App</h1>
          <p className="subtitle">Get real-time weather information for any location</p>
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
                <div key={index} className="suggestion-item" onClick={() => handleLocationSelect(location)}>
                  <span className="location-name">{location.name}</span>
                  <span className="location-country">{location.country}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {loading && (
          <div className="loading animate__animated animate__fadeIn">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error animate__animated animate__shakeX">
            <p>{error}</p>
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
                  <span className="temperature">{Math.round(weather.temp_c)}°</span>
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
                    <span className="detail-value">{weather.wind_kph} km/h</span>
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
                    <span className="detail-value">{Math.round(weather.feelslike_c)}°C</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInLeft">
                  <span className="detail-icon">🧭</span>
                  <div className="detail-info">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{weather.pressure_mb} mb</span>
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
                    <span className="detail-value">{Math.round(weather.dewpoint_c)}°C</span>
                  </div>
                </div>

                <div className="detail-item animate__animated animate__fadeInRight">
                  <span className="detail-icon">💨</span>
                  <div className="detail-info">
                    <span className="detail-label">Wind Gust</span>
                    <span className="detail-value">{weather.gust_kph} km/h</span>
                  </div>
                </div>
              </div>

              <div className="last-updated">
                <p>Last updated: {new Date(weather.last_updated).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
