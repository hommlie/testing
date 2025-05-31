import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PestPage.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import BranchHeader from './BranchHeader';
import Header from './Header';
import Navbar from './Navbar';
import IconSection from './IconSection';
import ContactForm from './ContactForm';
import PestServicesPart from './PestServicesPart';
import FaqSection from './FaqSection';
import TrendingPests from './TrendingPests';
import Footer from './Footer';
import CopyRight from './CopyRight';

function PestPage() {
  const { slug } = useParams();
  const [pest, setPest] = useState(null);
  const [quickLinksContent, setQuickLinksContent] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [linksPerSlide, setLinksPerSlide] = useState(5);
  const [selectedLink, setSelectedLink] = useState(null);
  const [showLinkContent, setShowLinkContent] = useState(false);

  useEffect(() => {
    fetch(`/api/pestspage/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPest(data.pest);
        setQuickLinksContent(data.quickLinks);
      });
  }, [slug]);

  useEffect(() => {
    const updateLinksPerSlide = () => {
      const width = window.innerWidth;
      if (width < 576) setLinksPerSlide(1);
      else if (width < 768) setLinksPerSlide(2);
      else if (width < 992) setLinksPerSlide(3);
      else if (width < 1200) setLinksPerSlide(4);
      else setLinksPerSlide(5);
    };
    updateLinksPerSlide();
    window.addEventListener('resize', updateLinksPerSlide);
    return () => window.removeEventListener('resize', updateLinksPerSlide);
  }, []);

  const nextSlide = () => {
    const maxSlide = Math.ceil(pest?.quickLinks.length / linksPerSlide) - 1;
    setCurrentSlide(prev => (prev < maxSlide ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const maxSlide = Math.ceil(pest?.quickLinks.length / linksPerSlide) - 1;
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleLinkClick = (linkText) => {
    setSelectedLink(linkText);
    setShowLinkContent(true);
    setTimeout(() => {
      const el = document.getElementById('quick-link-content');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderLinkContent = () => {
    const data = quickLinksContent[selectedLink];
    if (!data) return null;
    return (
      <div className="quick-link-content-section" id="quick-link-content">
        <div className="quick-link-content-container">
          <h2 className="quick-link-content-title">{data.title} for {pest.maintitle}</h2>
          <div className="title-divider"></div>
          <ul className="quick-link-content-list">
            {data.content.map((item, index) => (
              <li key={index} className="quick-link-content-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (!pest) return <div>Loading...</div>;

  return (
    <div className="pest-page">
      <BranchHeader />
      <Header />
      <Navbar />

      <div className="pest-hero" 
        style={{
        backgroundImage: `url(${pest.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
        <div className="hero-content-box">
          <div className="pest-header">
            <h1 className="pest-tit">{pest.maintitle}</h1>
            <h2 className="pest-sub">{pest.subtitle}</h2>
            <p className="pest-desc">{pest.description}</p>
          </div>

          <div className="slider-container">
            <button className="slider-arrow prev" onClick={prevSlide}><FiChevronLeft /></button>
            <div className="slider-wrap">
              <div className="slider-track" style={{ transform: `translateX(-${currentSlide * (100 / linksPerSlide)}%)` }}>
                {pest.quickLinks.map((link, index) => (
                  <div key={index} className="slider-slide" style={{ width: `${100 / linksPerSlide}%` }}>
                    <button
                      onClick={() => handleLinkClick(link.text)}
                      className="quick-link"
                      style={{
                        background: `linear-gradient(135deg, hsl(${index * 40}, 80%, 92%), hsl(${index * 40}, 80%, 85%))`,
                        
                      }}
                    >
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.text}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-arrow next" onClick={nextSlide}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {pest.detailedDescription && (
        <div className="pest-detailed-section">
          <div className="detailed-container">
            <h2 className="detailed-title">{pest.maintitle}</h2>
            <div className="title-divider"></div>
            <p className="detailed-paragraph">{pest.detailedDescription}</p>
          </div>
        </div>
      )}

      {showLinkContent && renderLinkContent()}

      <IconSection />
      <ContactForm />
      <PestServicesPart />
      <TrendingPests slug={slug} />
      <FaqSection slug={slug} />
      <Footer />
      <CopyRight />
    </div>
  );
}

export default PestPage;
