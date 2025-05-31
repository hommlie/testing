import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './preventiontips.css';
import {
  FaCheckCircle,
  FaShieldAlt,
  FaFlask,
  FaTools,
  FaCogs,
  FaGlobe,
  FaMapMarkedAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

const PreventionTips = () => {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />

      <section className="prevent-hero-section">
        <div className="prevent-hero-content">
          <div className="prevent-hero-text">
            <h1>Effective Pest Prevention Tips</h1>
            <p className="prevent-hero-description">
              Prevent pest infestations before they begin with these simple and effective pest prevention tips.
            </p>
          </div>
          <div className="prevent-contact-buttons">
            <a href="tel:+916363865658" className="prevent-contact-button phone">
              <FaPhone /> Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="prevent-contact-button whatsapp">
              <FaEnvelope /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="prevent-container">
        <div className="prevent-warning-section">
          <h2 className="prevent-section-title center">
            <FaShieldAlt className="icon" />
            Essential Pest Prevention Tips
          </h2>
          <p className="prevent-section-description">
            These tips will help protect your home or business from common pest infestations and keep your property pest-free.
          </p>

          <div className="prevent-card-grid">
            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaGlobe className="icon" /> Seal Cracks and Gaps</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Check for cracks around windows and doors</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Use caulk to seal gaps and entry points</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Prevent pests from entering your home</li>
              </ul>
            </div>

            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaCogs className="icon" /> Keep Food Stored Properly</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Store food in airtight containers</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Clean crumbs and spills immediately</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Prevent food sources for pests</li>
              </ul>
            </div>

            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaMapMarkedAlt className="icon" /> Maintain Cleanliness</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Regularly vacuum carpets and floors</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Dispose of trash frequently</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Maintain a clean environment to deter pests</li>
              </ul>
            </div>

            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaFlask className="icon" /> Eliminate Standing Water</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Fix leaky faucets and pipes</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Avoid standing water around the property</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Prevent attracting pests that thrive in damp areas</li>
              </ul>
            </div>

            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaTools className="icon" /> Maintain Yard and Landscaping</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Trim bushes and trees away from the building</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Remove fallen leaves and debris</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Keep your yard clean and well-maintained</li>
              </ul>
            </div>

            <div className="prevent-card">
              <h3 className="prevent-card-title"><FaShieldAlt className="icon" /> Regular Pest Inspections</h3>
              <ul className="prevent-checklist">
                <li><FaCheckCircle className="prevent-check-icon" /> Schedule regular pest inspections</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Detect early signs of infestations</li>
                <li><FaCheckCircle className="prevent-check-icon" /> Keep your property pest-free year-round</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="prevent-cta-section">
          <h2 className="prevent-cta-title">Take Action to Prevent Pests</h2>
          <p className="prevent-cta-description">
            Protect your home or business with our expert pest prevention services. Get in touch today for a comprehensive inspection.
          </p>

          <div className="prevent-cta-buttons">
            <a href="tel:+916363865658" className="prevent-cta-button primary">
              <FaPhone /> Call Now: 63638 65658
            </a>
            <a href="mailto:reach@hommlie.com" className="prevent-cta-button secondary">
              <FaEnvelope /> Email Us
            </a>
          </div>

          <p className="prevent-cta-footer">Serving homes, apartments, and businesses nationwide</p>
        </div>
      </div>

      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default PreventionTips;
