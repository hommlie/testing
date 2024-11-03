import React, { useState, useEffect, useRef } from 'react';
import { GrLocation } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit, MdCall } from "react-icons/md";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useCont } from '../../context/MyContext';
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import config from '../../config/config';
import { useToast } from "../../context/ToastProvider";
import { IoMdClose } from 'react-icons/io';

// Create a function to load Google Maps script
const loadGoogleMapsApi = (() => {
  let promise = null;

  return () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        // Remove any existing Google Maps scripts
        const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
        if (existingScript) {
          existingScript.remove();
        }

        // Clear any existing Google objects
        window.google = undefined;

        // Create new script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          // Give time for Places library to initialize
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
          promise = null; // Allow retry on error
        };

        document.head.appendChild(script);
      });
    }
    return promise;
  };
})();

const AddressModal = ({ isOpen, onClose }) => {
  const { addresses, setAddresses, selectedAddrs, setSelectedAddrs, getAddresses, getUser } = useCont();
  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');
  const warningNotify = (warning) => notify(warning, 'warning');
  const [selected, setSelected] = useState(null);
  const [formClicked, setFormClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landmark: "",
    pincode: "",
    mobile: "",
    email: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initializeGoogleMaps = async () => {
      if (!formClicked || !inputRef.current) return;

      setIsLoading(true);
      try {
        await loadGoogleMapsApi();
        
        if (!mounted) return;

        // Initialize autocomplete only if component is still mounted
        if (inputRef.current && window.google && window.google.maps && window.google.maps.places) {
          // Clear any existing autocomplete
          if (autocompleteRef.current) {
            window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
          }

          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'in' },
            fields: ['address_components', 'formatted_address', 'geometry', 'name']
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            
            if (!place.geometry) {
              warningNotify('Please select an address from the dropdown');
              return;
            }

            let address = place.formatted_address || '';
            let postcode = '';
            let locality = '';

            place.address_components.forEach(component => {
              const types = component.types;
              
              if (types.includes('postal_code')) {
                postcode = component.long_name;
              }
              if (types.includes('sublocality_level_1') || types.includes('locality')) {
                locality = component.long_name;
              }
            });

            setFormData(prev => ({
              ...prev,
              address: address,
              pincode: postcode || prev.pincode,
              landmark: locality || prev.landmark,
              latitude: place.geometry.location.lat().toString(),
              longitude: place.geometry.location.lng().toString()
            }));
          });
        }
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        if (mounted) {
          errorNotify('Failed to initialize address search. Please try again.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeGoogleMaps();

    return () => {
      mounted = false;
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [formClicked]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  const renderAddressInput = () => (
    <div className="relative">
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
        Address *
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Type to search address..."
          autoComplete="off"
          disabled={isLoading}
          className={`mt-1 block w-full rounded-md p-2 border shadow ${
            errors.address 
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
          } ${isLoading ? 'bg-gray-100' : ''}`}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>
      {errors.address && (
        <p className="mt-2 text-sm text-red-600">{errors.address}</p>
      )}
    </div>
  );

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          setCurrentLocationName(data.address?.neighbourhood);
          setFormClicked(true);
          setEditId(null);
          setFormData({
            ...formData,
            address: data.display_name,
            pincode: data.address.postcode || "",
            latitude: latitude.toString(),
            longitude: longitude.toString()
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          errorNotify("Failed to fetch current location. Please try again.");
        }
      }, () => {
        errorNotify("Unable to retrieve your location. Please check your browser settings.");
      });
    } else {
      errorNotify("Geolocation is not supported by this browser.");
    }
  };

  if (!isOpen) return null;

  const handleProceed = () => {
    console.log(selected);
    
    setSelectedAddrs(selected);    
    localStorage.setItem('HommlieselectedAddrs', JSON.stringify(selected));
    onClose();
  }

  const handleAddNew = () => {
    setFormClicked(true);
    setEditId(null);
    setFormData({
      name: "",
      address: "",
      landmark: "",
      pincode: "",
      mobile: "",
      email: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleEditAdd = (id) => {
    setFormClicked(true);
    setEditId(id);
    const addressToEdit = addresses.find((adr) => adr.id === id);
    setFormData({
      name: addressToEdit.name,
      address: addressToEdit.street_address,
      landmark: addressToEdit.landmark,
      pincode: addressToEdit.pincode,
      mobile: addressToEdit.mobile,
      email: addressToEdit.email,
      latitude: addressToEdit.latitude || "",
      longitude: addressToEdit.longitude || "",
    });
  };

  const handleDeleteAdd = async (id) => {

    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      await axios.post(`${config.API_URL}/api/deleteaddress`,
        {
          address_id: id,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 1) {
          getAddresses();
        } else {
          errorNotify(response.data.message);
          console.log("Error for deleting address", response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error removing address:", error);
      })
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "This field is required";
    if (!formData.address) tempErrors.address = "This field is required";
    if (!formData.pincode) tempErrors.pincode = "This field is required";
    if (!formData.mobile) tempErrors.mobile = "This field is required";
    if (!formData.email) tempErrors.email = "This field is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user = jwtDecode(jwtToken);
      if (validate()) {
        if (editId) {
          await axios.post(`${config.API_URL}/api/editaddress`,
            {
              id: editId,
              name: formData.name,
              address: formData.address,
              landmark: formData.landmark,
              pincode: formData.pincode,
              mobile: formData.mobile,
              email: formData.email,
              latitude: formData.latitude,
              longitude: formData.longitude,
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          ).then(response => {
            console.log(response.data.message);
            successNotify(response.data.message);
            getAddresses();
          }).catch(error => {
            console.log("Error updating address:", error);
          });
        } else {
          try {
            const response = await axios.post(`${config.API_URL}/api/saveaddress`,
              {
                user_id: user.id,
                name: formData.name,
                address: formData.address,
                landmark: formData.landmark,
                pincode: formData.pincode,
                mobile: formData.mobile,
                email: formData.email,
                latitude: formData.latitude,
                longitude: formData.longitude,
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
            console.log(response.data.message);
            successNotify(response.data.message);
            getAddresses();
            setFormData({
              name: "",
              address: "",
              landmark: "",
              pincode: "",
              mobile: "",
              email: "",
              latitude: "",
              longitude: "",
            });
            setFormClicked(false);
          } catch (error) {
            console.error('Error adding address:', error);
            errorNotify(error);
          }
        }
      }
    }
  };

  const handleSetDefault = (address) => {
    const updatedAddresses = addresses.map(adr =>
      adr.id === address.id ? { ...adr, default: true } : { ...adr, default: false }
    );
    setAddresses(updatedAddresses);
    setSelected(address);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Addresses</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {formClicked ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setFormClicked(false)}
                className="mb-4 flex items-center text-[#249370] hover:text-green-700"
              >
                <FaCircleArrowLeft className="mr-2" /> Back to Addresses
              </button>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md p-2 border shadow ${errors.name ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
              {formClicked && renderAddressInput()}
              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 border shadow focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md p-2 border shadow ${errors.pincode ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                  />
                  {errors.pincode && <p className="mt-2 text-sm text-red-600">{errors.pincode}</p>}
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile *</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md p-2 border shadow ${errors.mobile ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                  />
                  {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md p-2 border shadow ${errors.email ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#249370] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {editId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          ) : (
            <>
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => handleSetDefault(address)}
                      className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        address.default
                          ? 'border-2 border-green-500 bg-green-50'
                          : 'border border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAdd(address.id);
                          }}
                          className="text-gray-500 hover:text-[#249370]"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAdd(address.id);
                          }}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <RiDeleteBin5Line size={20} />
                        </button>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{address.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                      {address.landmark && <p className="text-sm text-gray-600 mb-1">{address.landmark}</p>}
                      <p className="text-sm text-gray-600 mb-1">{address.pincode}</p>
                      <p className="text-sm text-gray-600 mb-1 flex items-center">
                        <MdCall className="mr-1" />
                        {address.mobile}
                      </p>
                      <p className="text-sm text-gray-600">{address.email}</p>
                      {address.default && (
                        <span className="absolute bottom-2 right-2 text-xs font-semibold text-[#249370]">
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 my-8">No addresses found. Add a new address.</p>
              )}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  className="px-4 py-2 bg-[#249370] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                  onClick={getCurrentLocation}
                >
                  <GrLocation className="mr-2" />
                  Use Current Location
                </button>
                <button
                  className="px-4 py-2 border border-[#249370] text-[#249370] rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                  onClick={handleAddNew}
                >
                  <FaPlus className="mr-2" />
                  Add New Address
                </button>
                {selected && (
                  <button
                    className="px-4 py-2 bg-[#249370] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={handleProceed}
                  >
                    Proceed with Selected Address
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;