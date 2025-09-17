import React, { useState, useEffect, useRef } from 'react';
import { GrLocation } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit, MdCall } from "react-icons/md";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';
import { BiSearch } from "react-icons/bi";
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { useCont } from '../../context/MyContext';
import { useToast } from "../../context/ToastProvider";
import config from '../../config/config';

/* ---------------------------
   Google Maps Loader (memoized)
---------------------------- */
const loadGoogleMapsApi = (() => {
  let promise = null;
  return () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        // Remove any existing Google Maps script to avoid duplicates
        const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
        if (existing) existing.remove();

        // Reset global
        // eslint-disable-next-line no-undef
        window.google = undefined;

        // Inject new script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GMAP_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setTimeout(() => {
            if (window.google?.maps?.places) resolve(window.google);
            else {
              promise = null;
              reject(new Error('Google Maps Places library failed to load'));
            }
          }, 100);
        };
        script.onerror = () => {
          promise = null;
          reject(new Error('Failed to load Google Maps script'));
        };

        document.head.appendChild(script);
      });
    }
    return promise;
  };
})();

/* ---------------------------
   Component
---------------------------- */
const AddressModal = ({ isOpen, onClose }) => {
  const { addresses, setAddresses, setSelectedAddrs, getAddresses } = useCont();

  const notify = useToast();
  const successNotify = (m) => notify(m, 'success');
  const errorNotify = (m) => notify(m, 'error');
  const warningNotify = (m) => notify(m, 'warning');

  const [selected, setSelected] = useState(null);
  const [formClicked, setFormClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landmark: "",
    house_number: "",
    pincode: "",
    mobile: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  // Google refs
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  /* ---------------------------
     Helpers
  ---------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const extractAddressDetails = (components) => {
    const pincode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
    const landmark = components.find(c =>
      c.types.includes('sublocality') ||
      c.types.includes('neighborhood') ||
      c.types.includes('locality')
    )?.long_name || '';
    return { pincode, landmark };
  };

  const renderAddressInput = () => (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Search location..."
          autoComplete="off"
          disabled={isLoading}
          className={`pl-10 pr-4 py-2 w-full rounded-full border shadow-sm text-sm transition focus:outline-none focus:ring-2 ${
            errors.address
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
              : 'border-black focus:border-green-500 focus:ring-green-500'
          } ${isLoading ? 'bg-gray-100' : 'bg-white'}`}
        />
        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500" />
          </div>
        )}
      </div>
      {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
    </div>
  );

  /* ---------------------------
     Init Google Autocomplete when form opens
  ---------------------------- */
  useEffect(() => {
    let mounted = true;

    const initAutocomplete = async () => {
      if (!formClicked || !inputRef.current) return;

      setIsLoading(true);
      try {
        await loadGoogleMapsApi();
        if (!mounted) return;

        // cleanup old listeners if any
        if (autocompleteRef.current && window.google) {
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

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          const address = place.formatted_address || '';
          const { pincode, landmark } = extractAddressDetails(place.address_components || []);

          setFormData(prev => ({
            ...prev,
            address,
            pincode: pincode || prev.pincode,
            landmark: landmark || prev.landmark,
            latitude: lat.toString(),
            longitude: lng.toString()
          }));

          // Move marker and pan map
          if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
          }
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo({ lat, lng });
          }
        });
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
        if (mounted) errorNotify('Failed to initialize address search. Please try again.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAutocomplete();

    return () => {
      mounted = false;
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [formClicked]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------------------------
     Current Location → reverse geocode, init map + draggable marker
  ---------------------------- */
  const setupMapAt = async (lat, lng) => {
    await loadGoogleMapsApi();
    const center = { lat, lng };

    // Init map
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
      });
      mapInstanceRef.current = map;

      // Marker
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        draggable: true,
      });
      markerRef.current = marker;

      const geocoder = new window.google.maps.Geocoder();
      marker.addListener("dragend", () => {
        const newPos = marker.getPosition();
        const newLat = newPos.lat();
        const newLng = newPos.lng();

        geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (res, status) => {
          if (status === "OK" && res[0]) {
            const updatedAddress = res[0].formatted_address;
            const { pincode, landmark } = extractAddressDetails(res[0].address_components || []);
            setFormData(prev => ({
              ...prev,
              address: updatedAddress,
              pincode,
              landmark,
              latitude: newLat.toString(),
              longitude: newLng.toString(),
            }));
          } else {
            errorNotify("Error updating location.");
          }
        });
      });
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      errorNotify("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        await loadGoogleMapsApi();
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, async (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const { pincode, landmark } = extractAddressDetails(results[0].address_components || []);

            setFormClicked(true);
            setEditId(null);
            setFormData(prev => ({
              ...prev,
              address,
              pincode,
              landmark,
              latitude: latitude.toString(),
              longitude: longitude.toString()
            }));

            setTimeout(async () => {
              await setupMapAt(latitude, longitude);
            }, 300);
          } else {
            errorNotify("Unable to reverse geocode coordinates.");
          }
        });
      } catch (error) {
        console.error("Error using Google Geocoder:", error);
        errorNotify("Failed to fetch location using Google.");
      }
    }, () => {
      errorNotify("Unable to retrieve your location. Please check your browser settings.");
    }, { enableHighAccuracy: true });
  };

  /* ---------------------------
     Add New (opens form, centers on user location)
  ---------------------------- */
  const handleAddNew = () => {
    setFormClicked(true);
    setEditId(null);

    if (!navigator.geolocation) {
      errorNotify("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      setFormData(prev => ({
        ...prev,
        name: "",
        address: "",
        landmark: "",
        house_number: "",
        pincode: "",
        mobile: "",
        email: "",
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      }));

      try {
        await loadGoogleMapsApi();
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, async (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const { pincode, landmark } = extractAddressDetails(results[0].address_components || []);

            setFormData(prev => ({
              ...prev,
              address,
              pincode,
              landmark,
            }));

            setTimeout(async () => {
              await setupMapAt(latitude, longitude);
            }, 300);
          } else {
            errorNotify("Unable to get your location address.");
          }
        });
      } catch {
        errorNotify("Failed to initialize map.");
      }
    }, () => {
      errorNotify("Unable to fetch your location. Please allow location access.");
    }, { enableHighAccuracy: true });
  };

  /* ---------------------------
     Edit Existing
  ---------------------------- */
  const handleEditAdd = (id) => {
    setFormClicked(true);
    setEditId(id);
    const addressToEdit = addresses.find((adr) => adr.id === id);
    if (!addressToEdit) return;

    setFormData({
      name: addressToEdit.name || "",
      address: addressToEdit.address || "",
      landmark: addressToEdit.landmark || "",
      house_number: addressToEdit.house_number || "",
      pincode: addressToEdit.pincode || "",
      mobile: addressToEdit.mobile || "",
      email: addressToEdit.email || "",
      latitude: addressToEdit.latitude || "",
      longitude: addressToEdit.longitude || "",
    });

    const lat = parseFloat(addressToEdit.latitude);
    const lng = parseFloat(addressToEdit.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setTimeout(async () => {
        await setupMapAt(lat, lng);
      }, 300);
    }
  };

  /* ---------------------------
     Delete
  ---------------------------- */
  const handleDeleteAdd = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    try {
      const { data } = await axios.post(
        `${config.API_URL}/api/deleteaddress`,
        { address_id: id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      if (data.status === 1) {
        successNotify('Address deleted');
        getAddresses();
      } else {
        errorNotify(data.message || 'Delete failed');
      }
    } catch (err) {
      errorNotify('Error removing address');
      console.error(err);
    }
  };

  /* ---------------------------
     Validate & Submit
  ---------------------------- */
  const validate = () => {
    const temp = {};
    if (!formData.name) temp.name = "This field is required";
    if (!formData.address) temp.address = "This field is required";
    if (!formData.pincode) temp.pincode = "This field is required";
    if (!formData.mobile) temp.mobile = "This field is required";
    if (!formData.email) temp.email = "This field is required";
    if (!formData.latitude || !formData.longitude) temp.address = "Pick a valid map location";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      errorNotify('Please login');
      return;
    }
    const user = jwtDecode(jwtToken);
    if (!validate()) return;

    try {
      if (editId) {
        // UPDATE
        const { data } = await axios.post(
          `${config.API_URL}/api/editaddress`,
          {
            id: editId,
            name: formData.name,
            address: formData.address,
            landmark: formData.landmark,
            house_number: formData.house_number, // ✅ send house_number
            pincode: formData.pincode,
            mobile: formData.mobile,
            email: formData.email,
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        if (data.status === 1) {
          successNotify('Address updated');
          getAddresses();
          setFormClicked(false);
        } else {
          errorNotify(data.message || 'Update failed');
        }
      } else {
        // CREATE
        const { data } = await axios.post(
          `${config.API_URL}/api/saveaddress`,
          {
            user_id: user.id,
            name: formData.name,
            address: formData.address,
            landmark: formData.landmark,
            house_number: formData.house_number, // ✅ send house_number
            pincode: formData.pincode,
            mobile: formData.mobile,
            email: formData.email,
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        if (data.status === 1) {
          successNotify('Address saved');
          getAddresses();
          setFormData({
            name: "",
            address: "",
            landmark: "",
            house_number: "",
            pincode: "",
            mobile: "",
            email: "",
            latitude: "",
            longitude: "",
          });
          setFormClicked(false);
        } else {
          errorNotify(data.message || 'Save failed');
        }
      }
    } catch (err) {
      console.error(err);
      errorNotify('Request failed');
    }
  };

  /* ---------------------------
     Select default & proceed
  ---------------------------- */
  const handleSetDefault = (address) => {
    const updated = addresses.map(adr =>
      adr.id === address.id ? { ...adr, default: true } : { ...adr, default: false }
    );
    setAddresses(updated);
    setSelected(address);
  };

  const handleProceed = () => {
    setSelectedAddrs(selected);
    localStorage.setItem('HommlieselectedAddrs', JSON.stringify(selected));
    onClose();
  };

  /* ---------------------------
     Render
  ---------------------------- */
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Addresses</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {formClicked ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Map */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-auto">
                <div ref={mapRef} className="w-full h-full rounded-lg border shadow border-gray-300" />
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 w-full lg:w-1/2">
                <button
                  type="button"
                  onClick={() => setFormClicked(false)}
                  className="mb-4 flex items-center text-[#249370] hover:text-green-700"
                >
                  <FaCircleArrowLeft className="mr-2" /> Back to Addresses
                </button>

                {renderAddressInput()}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md p-2 border shadow ${errors.name ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                    <input
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 p-2 border shadow focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Near SBI ATM"
                    />
                  </div>
                  <div>
                    <label htmlFor="house_number" className="block text-sm font-medium text-gray-700">House / Flat Number</label>
                    <input
                      id="house_number"
                      name="house_number"
                      value={formData.house_number}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 p-2 border shadow focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., #101"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode *</label>
                    <input
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
                      id="mobile"
                      name="mobile"
                      minLength={10}
                      maxLength={10}
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
                    id="email"
                    name="email"
                    type="email"
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
            </div>
          ) : (
            <>
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => handleSetDefault(a)}
                      className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        a.default
                          ? 'border-2 border-green-500 bg-green-50'
                          : 'border border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditAdd(a.id); }}
                          className="text-gray-500 hover:text-[#249370]"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteAdd(a.id); }}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <RiDeleteBin5Line size={20} />
                        </button>
                      </div>

                      <h3 className="font-semibold text-lg mb-1">{a.name}</h3>
                      {a.house_number && <p className="text-sm text-gray-600 mb-1">{a.house_number}</p>}
                      <p className="text-sm text-gray-600 mb-1">{a.address}</p>
                      {a.landmark && <p className="text-sm text-gray-600 mb-1">{a.landmark}</p>}
                      <p className="text-sm text-gray-600 mb-1">{a.pincode}</p>
                      <p className="text-sm text-gray-600 mb-1 flex items-center">
                        <MdCall className="mr-1" /> {a.mobile}
                      </p>
                      <p className="text-sm text-gray-600">{a.email}</p>
                      {a.default && (
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
