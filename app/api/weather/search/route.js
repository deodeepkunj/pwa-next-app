export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({
      success: false,
      error: "Query parameter is required",
    });
  }

  try {
    // Using a free weather API key - in production, you should use your own API key
    const API_KEY = "your_api_key_here"; // Replace with your WeatherAPI.com key
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location suggestions");
    }

    const locations = await response.json();

    return Response.json({
      success: true,
      locations: locations.slice(0, 5), // Limit to 5 suggestions
    });
  } catch (error) {
    console.error("Search API error:", error);

    // Return mock data for demo purposes
    const mockLocations = [
      { name: "London", country: "United Kingdom" },
      { name: "New York", country: "United States" },
      { name: "Tokyo", country: "Japan" },
      { name: "Paris", country: "France" },
      { name: "Sydney", country: "Australia" },
    ].filter(
      (location) =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.country.toLowerCase().includes(query.toLowerCase())
    );

    return Response.json({
      success: true,
      locations: mockLocations,
    });
  }
}
