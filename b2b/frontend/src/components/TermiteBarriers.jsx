import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './TermiteBarriers.css'; 
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

const TermiteBarriers = () => {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />

      <section className="termite-hero-section">
        <div className="termite-hero-content">
          <div className="termite-hero-text">
            <h1>Protect Your Property with Termite Barriers</h1>
            <p className="termite-hero-description">
              Hommlie offers a range of effective termite barrier systems that prevent termite access and ensure long-term defense against infestations.
            </p>
          </div>
          <div className="termite-contact-buttons">
            <a href="tel:+916363865658" className="termite-contact-button phone">
              <FaPhone /> Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="termite-contact-button whatsapp">
              <FaEnvelope /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="termite-container">
        <div className="termite-warning-section">
          <h2 className="termite-section-title termite-center">
            <FaShieldAlt className="termite-icon" />
            Reliable Termite Barrier Systems
          </h2>
          <p className="termite-section-description">
            These scientifically engineered barriers offer continuous protection by deterring termite entry and disrupting their pathways.
          </p>

          <div className="termite-card-grid">
            <div className="termite-card">
              <h3 className="termite-card-title"><FaGlobe className="termite-icon" /> Chemical Soil Barriers</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Applied around foundations and slabs</li>
                <li><FaCheckCircle className="termite-check-icon" /> Forms a treated zone that repels termites</li>
                <li><FaCheckCircle className="termite-check-icon" /> Long-lasting and highly effective</li>
              </ul>
            </div>

            <div className="termite-card">
              <h3 className="termite-card-title"><FaCogs className="termite-icon" /> Physical Barriers</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Made from stainless steel mesh or crushed rock</li>
                <li><FaCheckCircle className="termite-check-icon" /> Installed during construction</li>
                <li><FaCheckCircle className="termite-check-icon" /> Non-toxic and environmentally safe</li>
              </ul>
            </div>

            <div className="termite-card">
              <h3 className="termite-card-title"><FaMapMarkedAlt className="termite-icon" /> Reticulation Systems</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Network of pipes beneath flooring or concrete</li>
                <li><FaCheckCircle className="termite-check-icon" /> Allows repeated chemical application</li>
                <li><FaCheckCircle className="termite-check-icon" /> Convenient for long-term maintenance</li>
              </ul>
            </div>

            <div className="termite-card">
              <h3 className="termite-card-title"><FaFlask className="termite-icon" /> Replenishable Termiticide Barriers</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Barrier injected with termiticides at intervals</li>
                <li><FaCheckCircle className="termite-check-icon" /> Easily recharged for ongoing protection</li>
                <li><FaCheckCircle className="termite-check-icon" /> Ideal for long-term building defense</li>
              </ul>
            </div>

            <div className="termite-card">
              <h3 className="termite-card-title"><FaTools className="termite-icon" /> Subfloor Barriers</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Used in raised floor buildings</li>
                <li><FaCheckCircle className="termite-check-icon" /> Blocks access from beneath structures</li>
                <li><FaCheckCircle className="termite-check-icon" /> Can combine with chemical or physical systems</li>
              </ul>
            </div>

            <div className="termite-card">
              <h3 className="termite-card-title"><FaShieldAlt className="termite-icon" /> Integrated Barrier Systems</h3>
              <ul className="termite-checklist">
                <li><FaCheckCircle className="termite-check-icon" /> Combines multiple barrier technologies</li>
                <li><FaCheckCircle className="termite-check-icon" /> Tailored based on building design and soil type</li>
                <li><FaCheckCircle className="termite-check-icon" /> Maximizes protection in high-risk areas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="termite-cta-section">
          <h2 className="termite-cta-title">Ready to Shield Your Property?</h2>
          <p className="termite-cta-description">
            Hommlie's barrier solutions are designed to prevent infestations before they begin. Let us help you keep your property safe.
          </p>

          <div className="termite-cta-buttons">
            <a href="tel:+916363865658" className="termite-cta-button primary">
              <FaPhone /> Call Now: 63638 65658
            </a>
            <a href="mailto:reach@hommlie.com" className="termite-cta-button secondary">
              <FaEnvelope /> Email Us
            </a>
          </div>

          <p className="termite-cta-footer">Serving homes, apartments, and businesses nationwide</p>
        </div>
      </div>

      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default TermiteBarriers;
