import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './IndustryServices.css';

const IndustryServices = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    fetch('/api/industry-services')
      .then(res => res.json())
      .then(data => setIndustries(data))
      .catch(err => console.error('Failed to fetch industry services:', err));
  }, []);

  return (
    <div className="services-container">
      <h1 className="services-title">Serving Industries for Over 60 Years</h1>
      <p className="services-subtitle">
        Select your industry sector below to discover our specialized solutions
      </p>

      <div className="services-divider"></div>

      <div className="industry-cards-container">
        {industries.map((industry, index) => (
          <div key={index} className="industry-card">
            <h3 className="industry-title">{industry.title}</h3>
            <div className="industry-image-container">
              <img src={industry.image} alt={industry.title} className="industry-image" />
            </div>
            <Link to={industry.path} className="read-more">
              <span>Read more</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#cc0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryServices;
