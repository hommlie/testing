import React, { useEffect, useState } from 'react';
import './IndustryHeroSection.css';

const IndustryHeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('/api/industry-hero')
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => console.error('Failed to fetch hero section:', err));
  }, []);

  if (!heroData) return null;

  return (
    <section className="industry-hero-container">
      <div className="industry-hero-content">
        <div className="industry-hero-text">
          <h1>{heroData.title}</h1>
          <p className="industry-hero-description">{heroData.description}</p>
        </div>
        <div className="industry-contact-buttons">
          <a href={`tel:+91${heroData.phone}`} className="industry-contact-button industry-phone">
            📞 Call Us: {heroData.phone}
          </a>
          <a href={`https://wa.me/${heroData.whatsapp}`} className="industry-contact-button industry-whatsapp">
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustryHeroSection;