import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoMdClose } from 'react-icons/io';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';

const InspectionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    latitude: '',
    longitude: '',
    mobile: '',
    email: '',
    date: new Date(),
    time: '',
  });

  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');

  const timeSlots = [
    '9 to 11 AM',
    '11 to 1 PM',
    '1 to 3 PM',
    '3 to 5 PM',
    '5 to 7 PM'
  ];

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && inputRef.current && !autocompleteRef.current) {
      initAutocomplete();
    }
  }, [isOpen]);

  const initAutocomplete = () => {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'in' }
    });

    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      console.warn('No details available for this place');
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      address: place.formatted_address,
      latitude: place.geometry.location.lat().toString(),
      longitude: place.geometry.location.lng().toString()
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      date: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      date: formData.date.toISOString(),
    };

    try {
      const response = await axios.post(
        `${config.API_URL}/api/createInspection`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 1) {
        successNotify('Inspection request submitted successfully!');
        setFormData({
          fullName: '',
          address: '',
          latitude: '',
          longitude: '',
          mobile: '',
          email: '',
          date: new Date(),
          time: '',
        });
        onClose();
      } else {
        errorNotify('Failed to submit inspection request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      errorNotify('An error occurred. Please check the console for details.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white">
            <h2 className="text-4xl font-bold mb-6">Schedule an Inspection</h2>
            <p className="mb-4">Fill out the form to request an inspection. We'll get back to you as soon as possible.</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Professional inspectors
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Flexible scheduling
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Comprehensive reports
              </li>
            </ul>
          </div>
          <div className="relative md:w-1/2 p-8">
            <button onClick={onClose} className="absolute top-3 right-3 text-black hover:text-gray-700">
              <IoMdClose size={20} color='black'  />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  ref={inputRef}
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#249370] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Submit Inspection Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionModal;