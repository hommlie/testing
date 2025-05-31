import React, { useState } from 'react';
import './FooterDropdown.css';

const areas = [
  "Bangalore", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai",
  "Noida", "Pune", "Ahmedabad", "Surat", "Jaipur", "Lucknow"
  
];

const FooterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = areas
    .filter(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  return (
    <div className="footer-dropdown-container">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>Select Serviceable Area</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-body">
          <input
            type="text"
            className="search-input"
            placeholder="Search area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="area-list">
            {filteredAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FooterDropdown;