import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./PestSectorGrid.css";

const PestSectorGrid = () => {
  const [data, setData] = useState(null);
  const [showAllPests, setShowAllPests] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);

  useEffect(() => {
    fetch("/api/grid/config")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load grid data:", err));
  }, []);

  if (!data) return <div>Loading pest sector grid...</div>;

  const togglePests = () => setShowAllPests(!showAllPests);
  const toggleSectors = () => setShowAllSectors(!showAllSectors);

  return (
    <div className="grid-wrapper">
      <h2>Smart Protection for Smarter Businesses</h2>
      <p>
        Keep your business pest-free with Hommlie's expert solutions.
        Whether it's an office, warehouse, retail store, or large facility, our certified professionals use advanced, industry-approved methods to eliminate pests efficiently. We prioritize hygiene, safety, and regulatory compliance—ensuring your operations run smoothly without interruption. Trust Hommlie for discreet, reliable, and results-driven pest management tailored for businesses.
      </p>
      <br/>
      <h4>Select a pest below to discover how Hommlie protects your business.</h4>

      <div className="grid-section">
        {[...data.pests.initial, ...(showAllPests ? data.pests.extra : [])].map((pest) => (
          <Link to={pest.path} key={pest.name} className="grid-item">
            <img src={pest.img} alt={pest.name} />
            <span>{pest.name}</span>
          </Link>
        ))}
        <div className="grid-item toggle" onClick={togglePests}>
          <div className={`toggle-icon ${showAllPests ? "minus" : "plus"}`}>
            {showAllPests ? "−" : "+"}
          </div>
          <span>{showAllPests ? "Show less pests" : "Show all pests"}</span>
        </div>
      </div>

      <div className="grid-section">
        {[...data.sectors.initial, ...(showAllSectors ? data.sectors.extra : [])].map((sector) => (
          <Link to={sector.path} key={sector.name} className="grid-item">
            <img src={sector.img} alt={sector.name} />
            <span>{sector.name}</span>
          </Link>
        ))}
        <div className="grid-item toggle dark" onClick={toggleSectors}>
          <div className={`toggle-icon ${showAllSectors ? "minus" : "plus"}`}>
            {showAllSectors ? "−" : "+"}
          </div>
          <span>{showAllSectors ? "Show fewer sectors" : "Show all sectors"}</span>
        </div>
      </div>

      <Link to="/services" className="view-all-button">
        View All Pest Control Services
      </Link>
    </div>
  );
};

export default PestSectorGrid;
