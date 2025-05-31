import React, { useEffect, useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [config, setConfig] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    segment: ''
  });

  useEffect(() => {
    fetch('/api/contact/config')
      .then(res => res.json())
      .then(setConfig)
      .catch(err => console.error('Failed to load contact config:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  if (!config) return <div className="hommlie-loading">Loading contact form...</div>;

  return (
    <div className="hommlie-contact-section">
      <div className="hommlie-contact-container">
        <h2 className="hommlie-contact-heading">{config.heading}</h2>
        <p className="hommlie-contact-subheading">Get in touch with our team</p>
        <form className="hommlie-contact-form" onSubmit={handleSubmit}>
          <div className="hommlie-form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hommlie-form-group">
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hommlie-form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hommlie-form-group">
            <select
              name="segment"
              value={formData.segment}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select Segment
              </option>
              {config.segments.map((seg, idx) => (
                <option key={idx} value={seg}>{seg}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="hommlie-submit-btn">
            Submit
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
