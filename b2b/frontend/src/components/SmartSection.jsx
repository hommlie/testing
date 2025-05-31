import React, { useEffect, useState } from "react";
import "./SmartSection.css";

const SmartFeaturesSection = () => {
  const [config, setConfig] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/smart/config")
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load SMART config:", err));
  }, []);

  const handleCardClick = (item) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveItem(null);
  };

  if (!config) return null;

  return (
    <section
      className="smart-features-section"
      style={{ backgroundColor: config.backgroundColor || "#fff" }}
    >
      <h2>{config.heading}</h2>

      <div className="smart-features-grid">
        {config.smartItems.map((item, idx) => (
          <div
            key={idx} 
            className="smart-feature-card"
            onClick={() => handleCardClick(item)}
          >
            <img src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {isModalOpen && activeItem && (
        <div className="smart-modal-overlay" onClick={closeModal}>
          <div className="smart-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="smart-modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="smart-modal-header">
              <img src={activeItem.icon} alt={activeItem.label} className="smart-modal-icon" />
              <h3>{activeItem.label}</h3>
            </div>
            <div className="smart-modal-body">
              <p>{activeItem.description}</p>
              {activeItem.features && (
                <ul className="smart-feature-list">
                  {activeItem.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SmartFeaturesSection;