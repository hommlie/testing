import React from "react";
import "./ClientLogoSection.css";

// Top row logos
import logo1 from "../assets/logo1.png"; // Baptist Hospital
import logo2 from "../assets/logo2.png"; // Nokia
import logo3 from "../assets/logo3.png"; // IBM

// Scrolling row logos
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo9.png";
import logo10 from "../assets/logo10.png";
import logo11 from "../assets/logo11.png";

const ClientLogoSection = () => {
  const staticLogos = [logo1, logo2, logo3];
  const scrollingLogos = [logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11];

  return (
    <section className="client-logo-section">
      {/* Heading */}
      <h2 className="section-heading">Brands That Hommlie Created The Hygiene World</h2>

      {/* Top row - fixed logos */}
      <div className="fixed-logo-row">
        {staticLogos.map((logo, index) => (
          <div className="logo-card" key={`static-${index}`}>
            <img src={logo} alt={`client-${index}`} />
          </div>
        ))}
      </div>

      {/* Bottom row - scrolling logos */}
      <div className="scrolling-logo-wrapper">
        <div className="scrolling-logo-track">
          {[...scrollingLogos, ...scrollingLogos].map((logo, index) => (
            <div className="logo-card small" key={`scroll-${index}`}>
              <img src={logo} alt={`scroll-client-${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <p className="join-text">Join The 10000+ Hommlie's Family To Recreate The Commercial Hygiene World.</p>
    </section>
  );
};

export default ClientLogoSection;
