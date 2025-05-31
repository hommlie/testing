import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './termiteinspection.css';
import { FaCheckCircle, FaExclamationTriangle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '../components/ContactForm'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'
import CopyRight from '../components/CopyRight'

const TermiteInspection = () => {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Professional Termite Inspection Services</h1>
            <p className="hero-description">
              Termites cause over $5 billion in property damage annually in the U.S. alone, often before homeowners notice any signs. Our certified inspectors use advanced technology to detect termite activity early, saving you from costly structural repairs.
            </p>
          </div>
          <div className="contact-buttons">
            <a href="tel:+916363865658" className="contact-button phone">
              <FaPhone /> Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="contact-button whatsapp">
              <FaEnvelope /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="warning-section">
          <h2 className="section-title center">
            <FaExclamationTriangle className="icon" />
            Signs of Termite Infestation
          </h2>
          
          <p className="section-description">
            Look for these common indicators of termite activity in your home:
          </p>
          
          <div className="card-grid">
            <div className="card">
              <h3 className="card-title">
                <FaExclamationTriangle className="icon" />
                Visible Signs
              </h3>
              <ul className="checklist">
                <li><FaCheckCircle className="check-icon" /> Mud tubes on exterior walls or foundations</li>
                <li><FaCheckCircle className="check-icon" /> Discarded wings near windows or doors</li>
                <li><FaCheckCircle className="check-icon" /> Hollow-sounding wood when tapped</li>
                <li><FaCheckCircle className="check-icon" /> Visible damage to wood structures</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="card-title">
                <FaExclamationTriangle className="icon" />
                Less Obvious Signs
              </h3>
              <ul className="checklist">
                <li><FaCheckCircle className="check-icon" /> Frass (termite droppings that resemble sawdust)</li>
                <li><FaCheckCircle className="check-icon" /> Bubbling or uneven paint</li>
                <li><FaCheckCircle className="check-icon" /> Stuck windows or doors</li>
                <li><FaCheckCircle className="check-icon" /> Maze-like patterns in furniture or walls</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="inspection-process">
          <h2 className="section-title center">
            Our Comprehensive Inspection Process
          </h2>
          
          <div className="process-grid">
            <div className="process-card">
              <div className="process-icon">
                <FaClock />
              </div>
              <h3>Thorough Examination</h3>
              <p>Our certified inspectors conduct a meticulous 150-point examination of both interior and exterior areas, including hard-to-reach spaces like crawl spaces, attics, and foundation walls.</p>
            </div>
            
            <div className="process-card">
              <div className="process-icon">
                <FaClock />
              </div>
              <h3>Advanced Technology</h3>
              <p>We employ moisture meters, infrared cameras, and acoustic detection devices to identify termite activity that's invisible to the naked eye.</p>
            </div>
            
            <div className="process-card">
              <div className="process-icon">
                <FaClock />
              </div>
              <h3>Detailed Reporting</h3>
              <p>You'll receive a comprehensive digital report with photographs, detailed findings, and recommended treatment options within 24 hours.</p>
            </div>
          </div>
        </div>
        
        <div className="inspection-timing">
          <h2 className="section-title">
            <FaClock className="icon" />
            When to Schedule an Inspection
          </h2>
          
          <div className="timing-content">
            <div className="timing-list">
              <ul>
                <li><FaCheckCircle className="check-icon" /> Before purchasing a home (critical for real estate transactions)</li>
                <li><FaCheckCircle className="check-icon" /> Annually as part of routine home maintenance</li>
                <li><FaCheckCircle className="check-icon" /> If you notice any signs of termite activity</li>
                <li><FaCheckCircle className="check-icon" /> After nearby properties report termite problems</li>
              </ul>
            </div>
            <div className="timing-fact">
              <h4>Did You Know?</h4>
              <p>Most homeowner's insurance policies don't cover termite damage. Regular inspections are your best defense against costly repairs.</p>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h2 className="cta-title">Protect Your Home Today</h2>
          <p className="cta-description">
            Termites work silently and can cause extensive damage before you notice any signs. 
            Early detection is key to minimizing repair costs.
          </p>
          
          <div className="cta-buttons">
            <a href="tel:+91 63638 65658" className="cta-button primary">
              <FaPhone /> Call Now: 63638 65658
            </a>
            <a href="mailto: reach@hommlie.com" className="cta-button secondary">
              <FaEnvelope /> Email Us
            </a>
          </div>
          
          <p className="cta-footer">
            Serving all residential and commercial properties in the area
          </p>
        </div>
      </div>
      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default TermiteInspection;