import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const PrimaryHeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('/api/hero/pest-control')
      .then(res => res.json())
      .then(setHeroData)
      .catch(err => console.error('Failed to load hero data:', err));
  }, []);

  if (!heroData) return <div>Loading hero section...</div>;

  return (
    <section className="primary-hero-section">
      <div className="primary-hero-content">
        <div className="primary-hero-text">
          <h1>{heroData.title}</h1>
          <p className="primary-hero-description">{heroData.description}</p>
        </div>
        <div className="primary-contact-buttons">
          <a href={`tel:+91${heroData.phone}`} className="primary-contact-button primary-phone">
            📞 Call Us: {heroData.phone}
          </a>
          <a href={`https://wa.me/${heroData.whatsapp}`} className="primary-contact-button primary-whatsapp">
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );

};

export default PrimaryHeroSection;
