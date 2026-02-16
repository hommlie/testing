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
          className={`pl-10 pr-4 py-2 w-full rounded-full border shadow-sm text-sm transition focus:outline-none focus:ring-2 ${errors.address
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
     Render - Bottom Sheet Style
  ---------------------------- */
  return (
    <div className={`fixed inset-0 z-[9999] ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] shadow-2xl flex flex-col max-h-[85vh] transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{ animation: isOpen ? 'slideUp 0.4s ease-out' : 'none' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {formClicked ? (editId ? 'Update Address' : 'Add New Address') : 'My Addresses'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {formClicked ? 'Enter your delivery details below' : 'Manage your delivery locations'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-hide">
          {formClicked ? (
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* Map Section */}
              <div className="w-full lg:w-[45%] h-[300px] lg:h-auto min-h-[300px] rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative">
                <div ref={mapRef} className="w-full h-full" />
                {/* Search Overlay on Map */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  {renderAddressInput()}
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleFormSubmit} className="w-full lg:w-[55%] space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Receiver's Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-[#0463ac]/20 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#0463ac]'}`}
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="10-digit number"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-[#0463ac]/20 ${errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#0463ac]'}`}
                      />
                      {errors.mobile && <span className="text-xs text-red-500 mt-1">{errors.mobile}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-[#0463ac]/20 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#0463ac]'}`}
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Flat, House no., Building</label>
                    <input
                      name="house_number"
                      value={formData.house_number}
                      onChange={handleChange}
                      placeholder="e.g. Flat 101, Galaxy Apts"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0463ac] focus:ring-2 focus:ring-[#0463ac]/20 text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Area / Street / Sector</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Start typing to search..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0463ac] focus:ring-2 focus:ring-[#0463ac]/20 text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                    />
                    {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode</label>
                      <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-[#0463ac]/20 ${errors.pincode ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#0463ac]'}`}
                      />
                      {errors.pincode && <span className="text-xs text-red-500 mt-1">{errors.pincode}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Landmark (Optional)</label>
                      <input
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="e.g. Near City Park"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0463ac] focus:ring-2 focus:ring-[#0463ac]/20 text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setFormClicked(false)}
                    className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3.5 rounded-xl bg-[#0463ac] text-white font-semibold shadow-lg shadow-[#0463ac]/20 hover:shadow-xl hover:bg-[#0351a0] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {editId ? 'Update & Save' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddNew}
                  className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0463ac] hover:bg-[#0463ac]/5 transition-all duration-300"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0463ac]/10 text-[#0463ac] group-hover:scale-110 transition-transform">
                    <FaPlus size={18} />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-[#0463ac]">Add New Address</span>
                </button>

                <button
                  onClick={getCurrentLocation}
                  className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0463ac] hover:bg-[#0463ac]/5 transition-all duration-300"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0463ac]/10 text-[#0463ac] group-hover:scale-110 transition-transform">
                    <GrLocation size={18} />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-[#0463ac]">Use Current Location</span>
                </button>
              </div>

              {/* Address List */}
              {addresses.length > 0 ? (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Saved Addresses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => handleSetDefault(a)}
                        className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${a.default
                          ? 'border-[#0463ac] bg-[#0463ac]/5 shadow-md shadow-[#0463ac]/10 ring-1 ring-[#0463ac]'
                          : 'border-gray-200 bg-white hover:border-[#0463ac]/50 hover:shadow-lg'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`h-8 w-8 flex items-center justify-center rounded-full ${a.default ? 'bg-[#0463ac] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#0463ac] group-hover:text-white transition-colors'}`}>
                              <GrLocation size={14} />
                            </span>
                            <h4 className="font-bold text-gray-900 text-lg">{a.name}</h4>
                            {a.default && (
                              <span className="px-2 py-0.5 rounded-full bg-[#0463ac] text-white text-[10px] font-bold uppercase tracking-wide">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEditAdd(a.id); }}
                              className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                              title="Edit"
                            >
                              <MdEdit size={18} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteAdd(a.id); }}
                              className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                              title="Delete"
                            >
                              <RiDeleteBin5Line size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="pl-10 space-y-1">
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {a.house_number ? `${a.house_number}, ` : ''}{a.address}
                          </p>
                          {a.landmark && <p className="text-gray-500 text-xs">Landmark: {a.landmark}</p>}
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100/50">
                            <span className="text-sm font-medium text-gray-700">{a.pincode}</span>
                            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                              <MdCall className="text-gray-400" /> {a.mobile}
                            </span>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        <div className={`absolute top-5 right-5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${a.default ? 'border-[#0463ac]' : 'border-gray-300'}`}>
                          {a.default && <div className="h-2.5 w-2.5 rounded-full bg-[#0463ac]" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <GrLocation className="text-gray-300 text-3xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No addresses found</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Add a new address to manage your deliveries efficiently.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions (Only when list view) */}
        {!formClicked && selected && addresses.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
            <button
              onClick={handleProceed}
              className="px-8 py-3.5 rounded-xl bg-[#0463ac] text-white font-bold shadow-lg shadow-[#0463ac]/20 hover:shadow-xl hover:bg-[#0351a0] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Confirm Selection</span>
              <FaCircleArrowLeft className="rotate-180" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AddressModal;
