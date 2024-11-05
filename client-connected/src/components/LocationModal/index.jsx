import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import config from '../../config/config';

const LocationModal = ({ onClose, setCurrentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const inputRef = useRef(null);
  const placesServiceRef = useRef(null);

  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsScriptLoaded(true);
      return;
    }

    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsScriptLoaded(true);
      };

      script.onerror = () => {
        setLocationError('Failed to load Google Maps');
      };

      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (isScriptLoaded && !placesServiceRef.current) {
      const dummyElement = document.createElement('div');
      placesServiceRef.current = new window.google.maps.places.PlacesService(dummyElement);
    }
  }, [isScriptLoaded]);

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

  const performSearch = () => {
    const request = {
      input: searchQuery,
      componentRestrictions: { country: 'in' },
      types: ['geocode', 'establishment']
    };

    const displaySuggestions = (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
        console.error('Place Autocomplete failed:', status);
        setSearchResults([]);
        return;
      }

      const formattedResults = predictions.map(prediction => ({
        placeId: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        address: prediction.structured_formatting.secondary_text,
        fullText: prediction.description
      }));

      setSearchResults(formattedResults);
    };

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(request, displaySuggestions);
  };

  const handleLocationSelect = async (result) => {
    setIsLoading(true);

    try {
      placesServiceRef.current.getDetails(
        {
          placeId: result.placeId,
          fields: ['geometry', 'formatted_address', 'name']
        },
        (place, status) => {
          setIsLoading(false);

          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const locationData = {
              name: place.name || result.name,
              address: place.formatted_address || result.address,
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            };

            // Handle the selected location
            console.log('Selected location:', locationData);
            const locationStings = locationData?.address?.split(',');
            if (locationStings.length > 4) {
              setCurrentLocation(locationStings?.slice(0, 5)?.join(','));
            } else {
              setCurrentLocation(locationData?.address);
            }
            onClose();
            // You can call a parent callback here
            // onLocationSelect(locationData);

            setSearchQuery(result.fullText);
            setSearchResults([]);
          } else {
            setLocationError('Failed to get location details');
          }
        }
      );
    } catch (error) {
      console.error('Error getting place details:', error);
      setLocationError('Failed to get location details');
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.GMAP_KEY}`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            const locationData = {
              name: data.results[0].formatted_address,
              address: data.results[0].formatted_address,
              location: {
                lat: latitude,
                lng: longitude
              }
            };

            // Handle the selected location
            console.log('Selected location:', locationData);
            const locationStings = locationData?.address?.split(',');
            if (locationStings.length > 3) {
              setCurrentLocation(locationStings?.slice(0, 4)?.join(','));
            } else {
              setCurrentLocation(locationData?.address);
            }
            onClose();
            // You can call a parent callback here
            // onLocationSelect(locationData);

            setSearchQuery(data.results[0].formatted_address);
            setSearchResults([]);
          } else {
            setLocationError('Location could not be fetched');
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
          setLocationError('Failed to fetch location details');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError(
          error.code === 1
            ? 'Location access denied. Please enable location services.'
            : 'Failed to get location'
        );
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg overflow-hidden">
        <div className="bg-white flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Select Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Search for your location/society/apartment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={getCurrentLocation}
          className="flex items-center px-4 py-3 text-blue-600 hover:bg-gray-50 w-full border-t border-b"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Use current location
          {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
        </button>

        {locationError && (
          <div className="p-4 flex flex-col items-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location Error</h3>
            <p className="mt-1 text-gray-500">{locationError}</p>
          </div>
        )}

        <div className="max-h-64 overflow-y-auto">
          {searchResults.map((result) => (
            <button
              key={result.placeId}
              onClick={() => handleLocationSelect(result)}
              className="w-full px-4 py-3 flex items-start hover:bg-gray-50 border-t first:border-t-0"
            >
              <svg className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <div className="text-left">
                <div className="font-medium text-gray-900">{result.name}</div>
                <div className="text-sm text-gray-500">{result.address}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;