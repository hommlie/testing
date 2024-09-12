import React, { useState, useEffect } from 'react';
import config from '../../config/config';

const GoogleMapsLoader = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  return isLoaded ? children : null;
};

export default GoogleMapsLoader;