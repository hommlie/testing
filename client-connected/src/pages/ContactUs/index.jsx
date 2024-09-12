import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert(Object.values(newErrors).join(' & '));
      return;
    }

    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const response = await axios.post(
        `${config.API_URL}/api/message`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        successNotify('Message sent successfully!');
        setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
      } else {
        errorNotify('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      errorNotify('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 rounded-md border-gray-600 shadow focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 shadow rounded-l-md text-gray-500 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 block w-full py-2 rounded-none rounded-r-md shadow focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                style={{backgroundColor: "#249370"}}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Need help?</h2>
            <p className="mb-4" style={{color: "#545454"}} >
              For any immediate help regarding your bookings, please log-in and visit our Help Center. You will be able to get instant resolution through our chat support.
            </p>
            {/* <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Open Help Center &rarr;
            </a> */}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Still facing issues?</h2>
            <p className="text-gray-600 mb-4" style={{color: "#545454"}}>
              If you've already tried chatting with us and are not satisfied with the resolution - please send us an email on <a href="mailto:reach@hommlie.com">reach@hommlie.com</a>. We will get back to you within 24-48 hours.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Media inquiries</h2>
            <p className="text-gray-600 mb-4" style={{color: "#545454"}}>
              For media inquiries, you can send us an email on <a href="mailto:reach@hommlie.com">reach@hommlie.com</a>
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">What is our helpline number?</h2>
            <p className="text-gray-600 mb-4" style={{color: "#545454"}}>
              We have switched from a customer care phone number to a fast, simple-to-use chat based support. Just open our Help Center, select your issue, and initiate a chat with us.
            </p>
          </div>
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Our office addresses</h2>
            <p className="text-gray-600 mb-4" style={{color: "#545454"}}>
              You can view a list of all our office addresses by clicking below
            </p>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View addresses &rarr;
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;