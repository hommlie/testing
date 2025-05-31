import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./BranchHeader.css";

const BranchHeader = () => {
  const [active, setActive] = useState("Commercial");

  const handleResidentialClick = () => {
    window.location.href = "https://hommlie.com/";
  };

  const handleCommercialClick = () => {
    setActive("Commercial");
  };

  const handleButtonClick = (buttonType) => {
    setActive(buttonType);
    if (buttonType === "Residential") {
      handleResidentialClick();
    }
  };

  return (
    <div className="branch-header">
      <div className="branch-header-top">
        {/* Contact Info */}
        <div className="contact-info">
          <div>
            <i className="fas fa-phone-alt"></i>
            <a href="tel:+916363865658" className="contact-link">+91 63638 65658</a>
          </div>
          {/* <div>
            <i className="fas fa-envelope"></i>
            <a href="mailto:reach@hommlie.com" className="contact-link">reach@hommlie.com</a>
          </div> */}
        </div>

        {/* Toggle Buttons */}
        <div className="middle-section">
          <div className="toggle-buttons">
            <button
              className={`toggle-button-pill ${active === "Residential" ? "active" : ""}`}
              onClick={() => handleButtonClick("Residential")}
            >
              <i className="fas fa-home"></i> Residential
            </button>
            <button
              className={`toggle-button-pill ${active === "Commercial" ? "active" : ""}`}
              onClick={() => handleButtonClick("Commercial")}
            >
              <i className="fas fa-building"></i> Commercial
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/hommlie/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/hommlie/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/company/hommlie/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://youtube.com/@hommlie?si=47U5D4zXme803c6G" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          <a href="https://x.com/HommlieOfficial" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://in.pinterest.com/hommlie2024/" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></a>
        </div>
      </div>
    </div>
  );
};

export default BranchHeader;
