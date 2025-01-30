import { useState } from "react";
import { Search, MapPin, Globe, Compass } from "lucide-react";

export default function CitySuggestions() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  const fetchCitySuggestions = async (name) => {
    if (name.length < 2) return;
    try {
      const response = await fetch(
        `https://45.76.191.227/suggestions/city?name=${name}`
      );
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://45.76.191.227/suggestions?q=${city}&latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();
      setResults(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center flex items-center justify-center mb-6">
        <Globe className="w-8 h-8 text-blue-600 mr-2" />
        City Suggestions
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <div className="flex items-center border p-2 rounded-lg bg-gray-100">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                fetchCitySuggestions(e.target.value);
              }}
              className="outline-none w-full bg-transparent"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white shadow-md rounded-md overflow-hidden z-10">
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setCity(s);
                    setSuggestions([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center border p-2 rounded-lg bg-gray-100 w-full md:w-1/4">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="outline-none w-full bg-transparent"
          />
        </div>

        <div className="flex items-center border p-2 rounded-lg bg-gray-100 w-full md:w-1/4">
          <Compass className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="outline-none w-full bg-transparent"
          />
        </div>

        <button
          onClick={fetchSuggestions}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((res, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm"
              >
                <h4 className="text-lg font-bold">{res.name}</h4>
                <p className="text-sm text-gray-600">
                  🌍 Latitude: {res.latitude}
                </p>
                <p className="text-sm text-gray-600">
                  🌍 Longitude: {res.longitude}
                </p>
                <p className="text-sm text-gray-600">⭐ Score: {res.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
