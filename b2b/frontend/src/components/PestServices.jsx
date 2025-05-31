import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PestServices.css';



const PestControlServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/pests/categories')
      .then(res => res.json())
      .then(data => setServices(data?.pests || []))
      .catch(err => console.error('Failed to fetch pest control services:', err));
  }, []);

  if (!services.length) return <div className="pest-loader">Loading pest services...</div>;

  return (
    <div className="pest-container">
      <h1 className="pest-title">Comprehensive Pest Control Solutions</h1>
      <p className="pest-subtitle">
        Choose your pest issue to explore our targeted treatment services
      </p>
      <div className="pest-cards">
        {services.map((pest, index) => (
          <div key={index} className="pest-card">
            <h3 className="pest-card-title">{pest.title}</h3>
            <div className="pest-image-wrapper">
              <img
                src={pest.image}
                alt={pest.title}
                className="pest-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=Service';
                }}
              />
            </div>
            <Link to={`/services/${pest.slug}`} className="pest-link">
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

export default PestControlServices;
