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
    console.log(isOpen);
    

    if (!isOpen) return null;
    
    return (
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300`}>
        <div className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
          <div className="text-center">
            {/* Success Icon with Animation */}
            <div className="relative mx-auto">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 mx-auto animate-bounce">
                <PartyPopper className="h-8 w-8 text-green-600" />
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
  
            {/* Success Message */}
            <h3 className="mt-4 text-2xl font-bold text-gray-900 mb-2">
              Thank you for registration!
            </h3>
            <div className="mt-3">
              <p className="text-gray-600">
                Our team will contact you soon.
              </p>
            </div>
  
            {/* Action Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold
                         hover:bg-green-700 transform transition-all duration-200
                         hover:shadow-lg hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Explore Our Services
              </button>
            </div>
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
        newErrors.userName = 'Business name is required';
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
    <div className="">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg glow-border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Mobile
              <span className='text-xs'>(verified)</span>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.phoneNumber}
              readOnly
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 border-gray-300 focus:ring-green-500`}
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                errors.userName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {errors.userName && (
              <p className="mt-1 text-sm text-red-500">{errors.userName}</p>
            )}
          </div>
          
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter Business Name"
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                errors.businessName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Pin Code
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter Pincode"
              maxLength={6}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                errors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Enter Full Address
            </label>
            <input
              ref={addressInputRef}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter business address"
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">
                Area
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">
                Landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Landmark Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City Name"
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                  errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State Name"
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-1 ${
                  errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#27595C] text-white py-3 rounded-lg hover:bg-[#1e464a] transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <SuccessModal isOpen={showSuccess} />

    </div>
  );
};

export default BusinessRegistrationForm;