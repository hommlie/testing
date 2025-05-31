import React, { useState, useEffect } from 'react';
import './FaqSection.css';

export default function FaqSection() {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch('/api/faq/config')
      .then(res => res.json())
      .then(data => {
        setFaqData(data.faqs);
        setHeading(data.heading);
        setSubtitle(data.subtitle);
      })
      .catch(err => console.error('Failed to load FAQs:', err));
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqData.length) return <div>Loading FAQs...</div>;

  return (
    <div className="pestfaq-container">
      <h2 className="pestfaq-heading">{heading}</h2>
      <p className="pestfaq-subtitle">{subtitle}</p>
      <div className="pestfaq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`pestfaq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="pestfaq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="pestfaq-icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className="pestfaq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
