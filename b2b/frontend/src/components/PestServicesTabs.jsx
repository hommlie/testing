import React, { useEffect, useState } from 'react';
import './PestServicesTabs.css';

const PestControlTabs = () => {
  const [tabData, setTabData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch('/api/pest/tabs')
      .then(res => res.json())
      .then(setTabData)
      .catch(err => console.error("Failed to load pest tabs:", err));
  }, []);

  if (!tabData) return <div>Loading pest control services...</div>;

  return (
    <section className="pest-control-section">
      <div className="pest-control-container">
        <h1 className="pest-control-title">{tabData.heading}</h1>
        <p className="pest-control-subheading">{tabData.subheading}</p>

        <div className="tabs-container">
          {tabData.tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="divider"></div>

        <div className="tab-content-wrapper">
          <div className="text-content">
            <h3 className="tab-description">{tabData.tabs[activeTab].description}</h3>
            <ul className="features-list">
              {tabData.tabs[activeTab].points.map((point, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet">•</span> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="image-content">
            <img
              src={tabData.tabs[activeTab].image}
              alt={tabData.tabs[activeTab].title}
              className="tab-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PestControlTabs;
