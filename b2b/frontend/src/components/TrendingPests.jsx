import React, { useEffect, useState } from 'react';
import './TrendingPests.css';

export default function TrendingPests() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/trending/config')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load trending pests:", err));
  }, []);

  if (!data) return <div>Loading trending pests...</div>;

  return (
    <section className="tp-wrapper">
      <div className="tp-header">
        <h2>{data.heading}</h2>
        <p className="tp-subtitle">
          {data.subtitle}
          <span>
            {' '}
            <a href="#" className="tp-inline-link">Contact us online</a> or call us at{' '}
            <a href={`tel:${data.pests[0]?.phone}`} className="tp-inline-link">{data.pests[0]?.phone}</a> to avail a pest survey of your premises.
          </span>
        </p>
      </div>

      <div className="tp-grid">
        {data.pests.map((pest, index) => (
          <article className="tp-card" key={index}>
            <div className="tp-image-container">
              <img src={pest.img} alt={pest.name} className="tp-image" />
            </div>
            <div className="tp-content">
              <h3>{pest.name}</h3>
              <p className="tp-description">
                {pest.description} Contact us at <a href={`tel:${pest.phone}`} className="tp-phone">{pest.phone}</a> to book your service.
              </p>
              <a href={pest.link} className="tp-link">Read more →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
