import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PestLibraryPage.css';
import pestImage from '../assets/seasoncockroaches.png';
import heroBackground from '../assets/pestlibrarybg1.png';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

const PestLibraryPage = () => {
  const pestCategories = [
    {
      id: 1,
      name: 'Amphipod',
      scientificName: 'Order Amphipoda',
      link: '/pest-library/amphipod'
    },
    {
      id: 2,
      name: 'Assassin Bugs',
      scientificName: 'Family Reduviidae',
      link: '/pest-library/assassin-bugs'
    },
    {
      id: 3,
      name: 'Bat Bug',
      scientificName: 'Cimex adjunctus',
      link: '/pest-library/bat-bug'
    },
    {
      id: 4,
      name: 'Bats',
      scientificName: 'Order Chiroptera',
      link: '/pest-library/bats'
    },
    {
      id: 5,
      name: 'Boxelder Bug',
      scientificName: 'Boisea trivittata',
      link: '/pest-library/boxelder-bug'
    },
    {
      id: 6,
      name: 'Caddisfly',
      scientificName: 'Order Trichoptera',
      link: '/pest-library/caddisfly'
    },
    {
      id: 7,
      name: 'Chinch Bug',
      scientificName: 'Blissus spp.',
      link: '/pest-library/chinch-bug'
    },
    {
      id: 8,
      name: 'Cicada',
      scientificName: 'Family Cicadidae',
      link: '/pest-library/cicada'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPests = pestCategories.filter(pest => 
    pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <BranchHeader />
      <Header transparent />
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section 
        className="plp-hero-section"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="plp-hero-overlay"></div>
        <div className="plp-hero-content">
          <div className="plp-hero-text">
            <h1>Pest Library</h1>
            <p className="plp-hero-description">
              Learn about common pests, their habits, and effective prevention methods to protect your home or business.
            </p>
          </div>
          <div className="plp-contact-buttons">
            <a href="tel:+916363865658" className="plp-contact-button plp-phone">
              📞 Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="plp-contact-button plp-whatsapp">
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      {/* Pest Grid Section */}
      <section className="plp-pest-section">
        <div className="plp-pest-container">
          <h2 className="plp-section-title">Browse All Pests</h2>
          <p className="plp-section-subtitle">Click on any pest to learn more about it</p>
          
          {/* Search Container */}
          <div className="plp-search-container">
            <div className="plp-search-wrapper">
              <input 
                type="text" 
                placeholder="Search pests..." 
                className="plp-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="plp-search-icon">🔍</span>
            </div>
          </div>

          <h3 className="plp-control-heading">Identify & Control Common Pests</h3>
          
          {/* Pest Grid */}
          <div className="plp-icon-grid">
            {filteredPests.length > 0 ? (
              filteredPests.map((pest) => (
                <Link to={pest.link} className="plp-icon-card" key={pest.id}>
                  <div className="plp-icon-container">
                    <img src={pestImage} alt={pest.name} className="plp-icon-image" />
                  </div>
                  <div className="plp-icon-content">
                    <h3>{pest.name}</h3>
                    <p className="plp-scientific-name">{pest.scientificName}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="plp-no-results">
                <p>No pests found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default PestLibraryPage;