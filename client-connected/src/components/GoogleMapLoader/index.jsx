import React, { useState, useEffect } from 'react';
import config from '../../config/config';

const GoogleMapsLoader = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      
      const handleScriptLoad = () => setIsLoaded(true);
      const handleScriptError = () => setHasError(true);

      script.addEventListener('load', handleScriptLoad);
      script.addEventListener('error', handleScriptError);

      document.head.appendChild(script);

      return () => {
        script.removeEventListener('load', handleScriptLoad);
        script.removeEventListener('error', handleScriptError);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (hasError) {
    return <div>Error loading Google Maps. Please check your internet connection and try again.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return children;
};

export default GoogleMapsLoader;