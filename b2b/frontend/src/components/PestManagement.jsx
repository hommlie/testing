import React, { useEffect, useState } from "react";
import './PestManagement.css';

export default function PestManagement() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/management/config")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load pest management config:", err));
  }, []);

  const navigateTo = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!data) return <div>Loading Pest Management...</div>;

  return (
    <section className="pest-management">
      <div className="management-header">
        <h2>{data.heading}</h2>
        <p className="management-subtitle">{data.subtitle}</p>
      </div>

      <div className="management-cards">
        {data.cards.map((card, idx) => (
          <div className="management-card" key={idx}>
            <div className="card-image-container">
              <img src={card.image} alt={card.title} className="card-image" />
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <ul className="card-features">
                {card.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              {card.link && (
                <button 
                  onClick={() => navigateTo(card.link)} 
                  className="card-link"
                >
                  View more →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
