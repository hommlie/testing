import React, { useState } from "react";
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    applyingFor: '',
    resume: null,
    message: ''
  });

  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
  
    for (const key in formData) {
      if (key === 'resume') {
        if (formData[key]) {
          data.append(key, formData[key], formData[key].name);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post(
        `${config.API_URL}/api/addcareer`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.status === 1) {
        successNotify('Application submitted successfully!');
        setFormData({ name: '', email: '', applyingFor: '', resume: null, message: '' });
      } else {
        errorNotify('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      errorNotify('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center py-14 bg-[#c5dbca]">
        <div className="text-9xl drop-shadow-2xl font-black tracking-tighter text-center text-black capitalize leading-[1.1] mt-4 max-md:text-4xl">
            One step closer to
        </div>
        <div className="text-9xl drop-shadow-2xl font-black tracking-tighter text-center text-white capitalize leading-[1.1] mt-4 max-md:text-4xl">
            your dream job
        </div>
        <div className="mt-20 text-lg italic leading-7 text-center text-black capitalize max-md:mt-10">
          let us help you find a job that suits you the best!
        </div>
        <div className="flex flex-wrap gap-10 justify-center mt-10 px-5 text-center text-black capitalize">
          {[
            { number: "20M+", label: "users" },
            { number: "500K+", label: "jobs" },
            { number: "100+", label: "partners" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="text-3xl font-black">{item.number}</div>
              <div className="text-lg">{item.label}</div>
            </div>
          ))}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcd6aa2102795ce852f0bdc59c875b1a49f839d18c9365a8bb71c8419504294b?apiKey=b0848bbc038c4c8e94f809863da2edc0&"
          className="mt-14 w-24 aspect-square max-md:mt-10"
          alt="Decorative icon"
        />
      </div>

      <div className="flex flex-col items-center px-5 w-full max-w-4xl mx-auto py-24 max-md:py-16">
        <h2 className="text-4xl font-black tracking-tighter text-black capitalize bg-clip-text bg-white mb-8">
          Why work with us?
        </h2>
        <div className="text-lg italic text-black capitalize mb-12 text-center">
          Get the fastest application so that your name is above other applications
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label htmlFor="applyingFor" className="block text-gray-700 text-sm font-bold mb-2">Applying for</label>
            <input type="text" id="applyingFor" name="applyingFor" value={formData.applyingFor} onChange={handleChange} className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label htmlFor="resume" className="block text-gray-700 text-sm font-bold mb-2">CV/Resume</label>
            <input type="file" id="resume" name="resume" onChange={handleChange} className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" style={{backgroundColor: "#249370"}} className="text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition duration-300">
              Send Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}