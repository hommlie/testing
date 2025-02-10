import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import config from "../../config/config";

const LocationSuggestion = ({ value, onChange, name = "address" }) => {
  const [searchQuery, setSearchQuery] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const inputRef = useRef(null);
  const placesServiceRef = useRef(null);
  const dropdownRef = useRef(null);

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
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        dummyElement
      );
    }
  }, [isScriptLoaded]);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && isScriptLoaded && placesServiceRef.current) {
        performSearch();
      } else if (!searchQuery) {
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    // Add click event listener to document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Perform Google Places search
  const performSearch = () => {
    const request = {
      input: searchQuery,
      componentRestrictions: { country: "in" },
      types: ["geocode", "establishment"],
    };

    const autocompleteService =
      new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(request, (predictions, status) => {
      if (
        status !== window.google.maps.places.PlacesServiceStatus.OK ||
        !predictions
      ) {
        setSearchResults([]);
        setIsDropdownVisible(false);
        return;
      }

      const formattedResults = predictions.map((prediction) => ({
        placeId: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        address: prediction.structured_formatting.secondary_text,
        fullText: prediction.description,
      }));

      setSearchResults(formattedResults);
      setIsDropdownVisible(true);
    });
  };

  // Handle location selection
  const handleLocationSelect = (result) => {
    const selectEvent = {
      target: {
        name: name,
        value: result.fullText,
      },
    };

    setSearchQuery(result.fullText);
    onChange(selectEvent); // Pass synthetic event to match handleFormChange
    setSearchResults([]);
    setIsDropdownVisible(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Create a synthetic event to match handleFormChange
    const syntheticEvent = {
      target: {
        name: name,
        value: inputValue,
      },
    };

    setSearchQuery(inputValue);
    onChange(syntheticEvent);
  };

  // Handle input focus
  const handleFocus = () => {
    if (searchResults.length > 0) {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="mt-1 p-2 border block w-full rounded-md shadow-sm"
        placeholder="Search for your location"
      />
      {isDropdownVisible && searchQuery && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-white shadow-lg rounded-md z-10 max-h-64 overflow-y-auto"
        >
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
