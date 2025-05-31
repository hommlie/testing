import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './treatmentmethod.css';
import {
  FaCheckCircle,
  FaTools,
  FaShieldAlt,
  FaFlask,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaBuilding
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

const TreatmentMethods = () => {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />

      <section className="treatment-hero-section">
        <div className="treatment-hero-content">
          <div className="treatment-hero-text">
            <h1>Effective Termite Treatment Methods</h1>
            <p className="treatment-hero-description">
              At Hommlie, we use scientifically proven and government-approved methods to eliminate termite infestations and safeguard your property long-term.
            </p>
          </div>
          <div className="treatment-contact-buttons">
           <a href="tel:+916363865658" className="treatment-contact-button phone">
            <FaPhone /> Call Us: 63638 65658
          </a>
          <a href="https://wa.me/916363865658" className="treatment-contact-button whatsapp">
            <FaEnvelope /> Chat on WhatsApp
          </a>
          </div>
        </div>
      </section>

      <div className="treatment-container">
        <div className="treatment-warning-section">
          <h2 className="treatment-section-title treatment-center">
            <FaShieldAlt className="icon" />
            Our Proven Termite Treatment Techniques
          </h2>
          <p className="treatment-section-description">
            We use a range of techniques suited to the severity and type of infestation to ensure safe and complete elimination.
          </p>

          <div className="treatment-card-grid">
            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaFlask className="icon" /> Soil Treatment</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Applied during pre- or post-construction phases</li>
                <li><FaCheckCircle className="check-icon" /> Creates a chemical barrier around your home</li>
                <li><FaCheckCircle className="check-icon" /> Prevents termites from reaching the foundation</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaFlask className="icon" /> Wood Treatment</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Direct chemical injection into infested wood</li>
                <li><FaCheckCircle className="check-icon" /> Preventive borate spray for long-lasting protection</li>
                <li><FaCheckCircle className="check-icon" /> Targets visible and hidden colonies</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaFlask className="icon" /> Bait Systems</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Installed discreetly around the property</li>
                <li><FaCheckCircle className="check-icon" /> Termites carry bait to colony, causing eradication</li>
                <li><FaCheckCircle className="check-icon" /> Non-invasive and eco-friendly approach</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaTools className="icon" /> Direct Liquid Treatment</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Ideal for visible infestation zones</li>
                <li><FaCheckCircle className="check-icon" /> Termiticide injected into cracks and crevices</li>
                <li><FaCheckCircle className="check-icon" /> Provides immediate and lasting relief</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaGlobe className="icon" /> External Barrier System</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Surrounds building perimeter with termiticide</li>
                <li><FaCheckCircle className="check-icon" /> Stops termites from entering through soil</li>
                <li><FaCheckCircle className="check-icon" /> Regular inspection and reinforcement</li>
              </ul>
            </div>

            <div className="treatment-card">
              <h3 className="treatment-card-title"><FaBuilding className="icon" /> Structural Fumigation</h3>
              <ul className="treatment-checklist">
                <li><FaCheckCircle className="check-icon" /> Whole structure covered and treated with gas</li>
                <li><FaCheckCircle className="check-icon" /> Used for severe and widespread infestations</li>
                <li><FaCheckCircle className="check-icon" /> Requires temporary evacuation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="treatment-cta-section">
          <h2 className="treatment-cta-title">Choose the Right Protection</h2>
          <p className="treatment-cta-description">
            Don't wait for structural damage to take hold. Our professional termite treatment options are tailored to your property's unique needs.
          </p>

          <div className="treatment-cta-buttons">
            <a href="tel:+916363865658" className="treatment-cta-button primary">
              <FaPhone /> Call Now: 63638 65658
            </a>
            <a href="mailto:reach@hommlie.com" className="treatment-cta-button secondary">
              <FaEnvelope /> Email Us
            </a>
          </div>

          <p className="treatment-cta-footer">Available for residential and commercial properties across India</p>
        </div>
      </div>

      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default TreatmentMethods;
