import React, { useEffect, useState } from 'react';
import './PestCards.css';

export default function PestCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/pestcards/config')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load pest cards:", err));
  }, []);

  if (!data) return <div>Loading pest cards...</div>;

  return (
    <section className="modern-pest-cards">
      <div className="modern-cards-header">
        <h2>{data.heading}</h2>
        <p className="modern-cards-subtitle">{data.subtitle}</p>
      </div>

      <div className="modern-cards-grid">
        {data.pests.map((pest, index) => (
          <div className="modern-card" key={index}>
            <div className="modern-card-image-container">
              <img src={pest.img} alt={pest.name} className="modern-card-image" />
            </div>
            <div className="modern-card-content">
              <h3>{pest.name}</h3>
              <p className="modern-card-description">
                {pest.description}
                <a href={`tel:${pest.phone}`} className="modern-phone-link">{pest.phone}</a>.
              </p>
              <a href={pest.link} className="modern-card-link">Read more →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
