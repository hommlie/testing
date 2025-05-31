import React, { useState, useEffect } from "react";
import "./InspectionSection.css";

const InspectionSection = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch("/api/inspection/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Error loading config:", err));
  }, []);

  if (!config) return null; // or loading spinner

  return (
    <section
      className="inspection-section"
      style={{ backgroundImage: `url(${config.backgroundImage})` }}
    >
      <div className="content-wrapper">
        {/* Left Side */}
        <div className="left-content">
          <h2 className="animated-headline">{config.headline}</h2>

          <form className="inspection-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Work Email" required />
            <input type="tel" placeholder="Mobile Number" required />
            <select required defaultValue="">
              <option value="" disabled hidden>
                Segment :
              </option>
              {config.segmentOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
            <button type="submit">{config.buttonText}</button>
          </form>
        </div>

        {/* Right Side */}
        <div className="right-content">
          <img src={config.boxImage} alt="Smart Pest Control" />
        </div>
      </div>
    </section>
  );
};

export default InspectionSection;
