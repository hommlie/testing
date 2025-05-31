import React, { useState } from "react";
import "./IconSection.css";
import icon1 from "../assets/icon11.png";
import icon2 from "../assets/icon22.png";
import icon3 from "../assets/icon33.png";
import icon4 from "../assets/icon44.png";
import icon5 from "../assets/icon55.png";
import icon6 from "../assets/icon66.png";

const IconSection = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const icons = [
    { 
      img: icon1, 
      label: "ISO Certified",
      description: "Our ISO certification demonstrates our commitment to quality management and customer satisfaction.",
      features: [
        "Internationally recognized quality standards",
        "Regular audits to maintain certification",
        "Consistent processes across all operations",
        "Commitment to continuous improvement"
      ]
    },
    { 
      img: icon2, 
      label: "Trained Professionals",
      description: "Our team consists of highly trained experts with industry-recognized certifications.",
      features: [
        "Regular training and skill development",
        "Specialized certifications in relevant fields",
        "Years of hands-on experience",
        "Ongoing performance evaluations"
      ]
    },
    { 
      img: icon3, 
      label: "Warranty Services",
      description: "Comprehensive warranty coverage gives you peace of mind for your investment.",
      features: [
        "Industry-leading warranty periods",
        "Quick response to warranty claims",
        "Transparent terms and conditions",
        "Dedicated warranty support team"
      ]
    },
    { 
      img: icon4, 
      label: "Digital Monitoring",
      description: "Advanced digital monitoring systems provide real-time insights into your operations.",
      features: [
        "24/7 remote monitoring capabilities",
        "Automated alerts for critical issues",
        "Historical performance tracking",
        "Customizable dashboard views"
      ]
    },
    { 
      img: icon5, 
      label: "CIB Approved",
      description: "Our CIB approval signifies compliance with the highest industry standards.",
      features: [
        "Rigorous vetting process",
        "Adherence to safety regulations",
        "Regular compliance checks",
        "Trusted by financial institutions"
      ]
    },
    { 
      img: icon6, 
      label: "Cost-Effective",
      description: "We deliver maximum value through efficient solutions tailored to your budget.",
      features: [
        "Competitive pricing models",
        "Long-term cost savings",
        "Value engineering approach",
        "Transparent pricing structure"
      ]
    },
  ];

  const handleCardClick = (icon) => {
    setActiveIcon(icon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveIcon(null);
  };

  return (
    <section className="icon-section">
      <h2 className="icon-title">WHY HOMMLIE</h2>
      <div className="icon-grid">
        {icons.map((icon, index) => (
          <div 
            key={index} 
            className="icon-card"
            onClick={() => handleCardClick(icon)}
          >
            <img src={icon.img} alt={icon.label} />
            <p>{icon.label}</p>
          </div>
        ))}
      </div>

      {isModalOpen && activeIcon && (
        <div className="icon-modal-overlay" onClick={closeModal}>
          <div className="icon-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="icon-modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="icon-modal-header">
              <img src={activeIcon.img} alt={activeIcon.label} className="icon-modal-icon" />
              <h3>{activeIcon.label}</h3>
            </div>
            <div className="icon-modal-body">
              <p>{activeIcon.description}</p>
              {activeIcon.features && (
                <ul className="icon-feature-list">
                  {activeIcon.features.map((feature, i) => (
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

export default IconSection;