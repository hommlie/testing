import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Search, X, MapPin, Navigation, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

            const locationStings = locationData?.address?.split(',');
            if (locationStings.length > 4) {
              setCurrentLocation(locationStings?.slice(0, 5)?.join(','));
            } else {
              setCurrentLocation(locationData?.address);
            }
            onClose();

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

            const locationStings = locationData?.address?.split(',');
            if (locationStings.length > 3) {
              setCurrentLocation(locationStings?.slice(0, 4)?.join(','));
            } else {
              setCurrentLocation(locationData?.address);
            }
            onClose();

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0463ac] to-[#0580ca] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <MapPin className="text-3xl mx-auto mb-2 opacity-90" />
          <h2 className="text-xl font-bold">Select Your Location</h2>
          <p className="text-xs text-blue-100 opacity-80 mt-1">Search for your area to see services nearby</p>
        </div>

        <div className="p-6">
          {/* Search Input */}
          <div className="relative mb-4 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#0463ac] transition-colors" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0463ac] focus:ring-4 focus:ring-[#0463ac]/5 transition-all font-medium text-gray-700"
              placeholder="Search for colony, street, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            onClick={getCurrentLocation}
            className="flex items-center gap-4 w-full p-4 bg-blue-50/50 hover:bg-blue-50 rounded-2xl transition-all group border border-blue-100/50"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Navigation className="w-5 h-5 text-[#0463ac]" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-bold text-[#0463ac]">Use Current Location</p>
              <p className="text-[11px] text-blue-400 font-medium tracking-tight">Detect via GPS for better accuracy</p>
            </div>
            {isLoading && <Loader2 className="w-5 h-5 text-[#0463ac] animate-spin" />}
          </button>

          {locationError && (
            <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600">
              <X className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold leading-tight">{locationError}</p>
            </div>
          )}

          {/* Results List */}
          <div className="mt-4 max-h-64 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {searchResults.map((result, idx) => (
                <motion.button
                  key={result.placeId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full p-4 flex items-start gap-4 hover:bg-gray-50 rounded-2xl transition-all text-left border-b border-gray-50 last:border-0 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0463ac]/10 group-hover:text-[#0463ac] transition-colors">
                    <Map className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800 group-hover:text-[#0463ac] transition-colors">{result.name}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5 line-clamp-1">{result.address}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LocationModal;