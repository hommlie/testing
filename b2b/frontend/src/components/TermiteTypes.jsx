import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './termiteTypes.css';
import {
  FaBug,
  FaHome,
  FaTree,
  FaBuilding,
  FaSearch,
  FaTint,
  FaLeaf,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

const TermiteTypes = () => {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />

      <section className="termite-types-hero">
        <div className="hero-overlay"></div>
        <div className="termite-types-hero-content">
          <h1><FaBug /> Types of Termites</h1>
          <p>Explore the most common termite species and how each can impact your home or business differently.</p>
        </div>
      </section>

      <div className="termite-types-container">
        <h2 className="termite-types-title"><FaSearch /> Termite Identification Guide</h2>

        <div className="termite-types-grid">
          <div className="termite-card">
            <FaHome className="termite-icon" />
            <h3>Subterranean Termites</h3>
            <p>The most destructive type. These termites live underground and attack foundations, creating mud tunnels to invade wooden structures.</p>
          </div>

          <div className="termite-card">
            <FaTree className="termite-icon" />
            <h3>Drywood Termites</h3>
            <p>They live and feed within dry wood. Common in furniture and hardwood floors, they leave behind small fecal pellets as signs.</p>
          </div>

          <div className="termite-card">
            <FaBuilding className="termite-icon" />
            <h3>Dampwood Termites</h3>
            <p>These large termites prefer wet, decaying wood and are often found in areas with high humidity or plumbing issues.</p>
          </div>

          <div className="termite-card">
            <FaBug className="termite-icon" />
            <h3>Formosan Termites</h3>
            <p>Known as "super termites," they form massive colonies and aggressively damage wood. Very hard to control without professional help.</p>
          </div>

          <div className="termite-card">
            <FaTint className="termite-icon" />
            <h3>Conehead Termites</h3>
            <p>Named after their cone-shaped heads, these termites forage above ground and can move quickly, attacking trees and structures.</p>
          </div>

          <div className="termite-card">
            <FaLeaf className="termite-icon" />
            <h3>Desert Termites</h3>
            <p>Less destructive to homes but vital for ecosystems, they break down dry plant matter. Found in arid regions and rarely infest buildings.</p>
          </div>
        </div>
      </div>

      <section className="termite-types-cta">
        <h2>Not Sure What Kind of Termite It Is?</h2>
        <p>Book a free inspection and let Hommlie's experts identify and eliminate the threat.</p>
        <div className="termite-types-buttons">
          <a href="tel:+916363865658" className="termite-btn call-btn">
            <FaPhone /> Call Now: 63638 65658
          </a>
          <a href="mailto:reach@hommlie.com" className="termite-btn email-btn">
            <FaEnvelope /> Email Us
          </a>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <CopyRight />
    </>
  );
};

export default TermiteTypes;