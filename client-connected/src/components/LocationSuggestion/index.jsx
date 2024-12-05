import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import config from "../../config/config";

const LocationSuggestion = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const inputRef = useRef(null);
  const placesServiceRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsScriptLoaded(true);
      return;
    }

    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsScriptLoaded(true);
      };

      script.onerror = () => {
        setLocationError("Failed to load Google Maps");
      };

      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Initialize Places Service
  useEffect(() => {
    if (isScriptLoaded && !placesServiceRef.current) {
      const dummyElement = document.createElement("div");
      placesServiceRef.current = new window.google.maps.places.PlacesService(dummyElement);
    }
  }, [isScriptLoaded]);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && isScriptLoaded && placesServiceRef.current) {
        performSearch();
      } else if (!searchQuery) {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Perform Google Places search
  const performSearch = () => {
    const request = {
      input: searchQuery,
      componentRestrictions: { country: "in" },
      types: ["geocode", "establishment"],
    };

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(request, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
        setSearchResults([]);
        return;
      }

      const formattedResults = predictions.map((prediction) => ({
        placeId: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        address: prediction.structured_formatting.secondary_text,
        fullText: prediction.description,
      }));

      setSearchResults(formattedResults);
    });
  };

  // Handle location selection
  const handleLocationSelect = (result) => {
    setSearchQuery(result.fullText);
    onChange(result.fullText);
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onChange(e.target.value);
        }}
        className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
        placeholder="Search for your location"
      />
      {searchQuery && (
        <div className="absolute w-full bg-white shadow-lg rounded-md z-10 max-h-64 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <button
                key={result.placeId}
                onClick={() => handleLocationSelect(result)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-500">{result.address}</div>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSuggestion;
