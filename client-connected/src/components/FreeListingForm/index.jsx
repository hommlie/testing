import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { Check, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const loadGoogleMapsApi = (() => {
  let promise = null;
  return () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
        if (existingScript) {
          existingScript.remove();
        }
        window.google = undefined;
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setTimeout(() => {
            if (window.google && window.google.maps && window.google.maps.places) {
              resolve(window.google);
            } else {
              reject(new Error('Google Maps Places library failed to load'));
            }
          }, 100);
        };

        script.onerror = () => {
          reject(new Error('Failed to load Google Maps script'));
          promise = null;
        };

        document.head.appendChild(script);
      });
    }
    return promise;
  };
})();

const SuccessModal = ({ isOpen }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <PartyPopper className="h-8 w-8 text-green-600" />
            <Check className="absolute h-5 w-5 text-white bg-green-500 rounded-full p-0.5" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900">
            Thank you for registration!
          </h3>
          
          <p className="text-gray-600">
            Our team will contact you soon.
          </p>
          
          <button
            onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-medium
                      hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 
                      focus:ring-green-500 focus:ring-offset-2"
          >
            Explore Our Services
          </button>
        </div>
      </div>
    </div>
  );
};

const BusinessRegistrationForm = ({ phoneNumber }) => {
  const [formData, setFormData] = useState({
    phoneNumber,
    userName: '',
    businessName: '',
    pincode: '',
    address: '',
    area: '',
    landmark: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initializeGoogleMaps = async () => {
      if (!addressInputRef.current) return;

      setIsLoading(true);
      try {
        await loadGoogleMapsApi();
        
        if (!mounted) return;

        if (addressInputRef.current && window.google?.maps?.places) {
          if (autocompleteRef.current) {
            window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
          }

          autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'in' }
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            
            if (!place.geometry) {
              setErrors(prev => ({
                ...prev,
                address: 'Please select an address from the dropdown'
              }));
              return;
            }

            let address = place.formatted_address || '';
            let postcode = '';
            let city = '';
            let state = '';
            let area = '';

            place.address_components.forEach(component => {
              const types = component.types;
              
              if (types.includes('postal_code')) {
                postcode = component.long_name;
              }
              if (types.includes('locality')) {
                city = component.long_name;
              }
              if (types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
              if (types.includes('sublocality_level_1')) {
                area = component.long_name;
              }
            });

            setFormData(prev => ({
              ...prev,
              address: address,
              pincode: postcode || prev.pincode,
              city: city || prev.city,
              state: state || prev.state,
              area: area || prev.area
            }));
          });
        }
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setErrors(prev => ({
          ...prev,
          address: 'Failed to initialize address search'
        }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeGoogleMaps();

    return () => {
      mounted = false;
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pin code';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/freelisting/create`, formData);
      
      if (response.data.status === 1) {        
        setShowSuccess(true);
        setFormData({
          userName: '',
          businessName: '',
          pincode: '',
          address: '',
          area: '',
          landmark: '',
          city: '',
          state: ''
        });
      } else {
        setErrors(prev => ({
          ...prev,
          submit: response.data.message || 'Failed to register business'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'An error occurred while registering your business'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Business Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-700 bg-gray-50"
            />
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter business name"
              className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                errors.businessName ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
              }`}
            />
            {errors.businessName && (
              <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>
            )}
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Pin Code <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              maxLength={6}
              className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                errors.pincode ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
              }`}
            />
            {errors.pincode && (
              <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label> */}
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area name"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label> */}
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Nearby landmark"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label> */}
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City name"
                className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                  errors.city ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label> */}
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State name"
                className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                  errors.state ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-[#92b876] text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Register Business'}
          </button>
        </form>
      </div>

      <SuccessModal isOpen={showSuccess} />
    </div>
  );
};

export default BusinessRegistrationForm;