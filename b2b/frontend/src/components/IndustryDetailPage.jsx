// src/components/IndustryDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './IndustryDetailPage.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import BranchHeader from './BranchHeader';
import Header from './Header';
import Navbar from './Navbar';
import IconSection from './IconSection';
import ContactForm from './ContactForm';
import FaqSection from './FaqSection';
import Footer from './Footer';
import CopyRight from './CopyRight';
import TrendingPests from './TrendingPests';

function IndustryDetailPage() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [linksPerSlide, setLinksPerSlide] = useState(5);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        const res = await axios.get(`/api/industry/config/${slug}`);
        setIndustry(res.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchIndustryData();
  }, [slug]);

  useEffect(() => {
    const updateLinksPerSlide = () => {
      const width = window.innerWidth;
      if (width < 480) setLinksPerSlide(1);
      else if (width < 640) setLinksPerSlide(2);
      else if (width < 768) setLinksPerSlide(3);
      else if (width < 992) setLinksPerSlide(4);
      else setLinksPerSlide(5);
    };

    updateLinksPerSlide();
    window.addEventListener('resize', updateLinksPerSlide);
    return () => window.removeEventListener('resize', updateLinksPerSlide);
  }, []);

  const nextSlide = () => {
    const maxSlide = Math.ceil(industry.quickLinks.length / linksPerSlide) - 1;
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const maxSlide = Math.ceil(industry.quickLinks.length / linksPerSlide) - 1;
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    window.scrollTo({
      top: document.querySelector('.industry-detail-content-section').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleBackToOverview = () => {
    setSelectedLink(null);
  };

  if (loading) return <div className="industry-detail-loading">Loading...</div>;
  if (error || !industry) return <div className="industry-detail-not-found">Industry not found</div>;

  return (
    <div className="industry-detail-page with-sticky-header">
      <BranchHeader />
      <div className="industry-fixed-header">
        <Header />
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="industry-detail-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${industry.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="industry-detail-hero-content">
          <div className="industry-detail-header">
            <h1 className="industry-detail-main-title">{industry.maintitle}</h1>
            <p className="industry-detail-sub-title">{industry.subtitle}</p>
            <p className="industry-detail-description">{industry.description}</p>
          </div>

          <div className="industry-detail-slider-container">
            <button className="industry-detail-slider-arrow industry-detail-slider-prev" onClick={prevSlide}>
              <FiChevronLeft />
            </button>

            <div className="industry-detail-slider-wrapper">
              <div
                className="industry-detail-slider-track"
                style={{ transform: `translateX(-${currentSlide * (100 / linksPerSlide)}%)` }}
              >
                {industry.quickLinks.map((link, index) => (
                  <div key={index} className="industry-detail-slider-slide" style={{ width: `${100 / linksPerSlide}%` }}>
                    <button
                      className="industry-detail-quick-link"
                      onClick={() => handleLinkClick(link)}
                      style={{
                        background: `linear-gradient(135deg, hsl(${index * 40}, 80%, 92%), hsl(${index * 40}, 80%, 85%))`,
                        borderBottom: `3px solid hsl(${index * 40}, 70%, 50%)`,
                        cursor: 'pointer'
                      }}
                    >
                      <span className="industry-detail-link-icon">{link.icon}</span>
                      <span className="industry-detail-link-text">{link.text}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="industry-detail-slider-arrow industry-detail-slider-next" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>

          <div className="industry-detail-slider-dots">
            {Array.from({ length: Math.ceil(industry.quickLinks.length / linksPerSlide) }).map((_, i) => (
              <button
                key={i}
                className={`industry-detail-dot ${i === currentSlide ? 'industry-detail-dot-active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="industry-detail-content-section">
        <div className="industry-detail-container">
          {selectedLink ? (
            <div className="industry-detail-link-content">
              <button onClick={handleBackToOverview} className="industry-detail-back-button">
                ← Back to Overview
              </button>
              <h2 className="industry-detail-title">{selectedLink.details.title}</h2>
              <p className="industry-detail-full-description">{selectedLink.details.description}</p>

              <div className="industry-detail-features">
                {selectedLink.details.points.map((point, idx) => (
                  <div key={idx} className="industry-detail-feature-box">
                    <h3 className="industry-detail-feature-title">{point}</h3>
                  </div>
                ))}
              </div>

              <div className="industry-detail-additional-info">
                <p>{selectedLink.details.additionalInfo}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="industry-detail-title">{industry.title}</h2>
              <p className="industry-detail-full-description">{industry.detailedDescription}</p>

              <div className="industry-detail-features">
                <div className="industry-detail-feature-box">
                  <h3 className="industry-detail-feature-title">Our Approach</h3>
                  <p className="industry-detail-feature-text">Customized Integrated Pest Management (IPM) programs tailored to your specific facility requirements and operational schedules.</p>
                </div>
                <div className="industry-detail-feature-box">
                  <h3 className="industry-detail-feature-title">Compliance Focus</h3>
                  <p className="industry-detail-feature-text">Detailed documentation and reporting to meet all regulatory requirements for your industry.</p>
                </div>
                <div className="industry-detail-feature-box">
                  <h3 className="industry-detail-feature-title">Prevention First</h3>
                  <p className="industry-detail-feature-text">Emphasis on exclusion and sanitation recommendations to prevent pest issues before they begin.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <IconSection />
      <ContactForm />
      <TrendingPests />
      <FaqSection
        faqs={[
          {
            question: `How often should ${slug.replace('-', ' ')} facilities be serviced?`,
            answer: `Most ${slug.replace('-', ' ')} facilities require monthly services, but frequency depends on risk assessment.`
          },
          {
            question: 'Are your treatments safe for our operations?',
            answer: 'We use industry-approved methods that won\'t disrupt your workflow or compromise safety.'
          },
          {
            question: 'Do you provide emergency services?',
            answer: 'Yes, we offer 24/7 emergency response for critical pest situations.'
          }
        ]}
      />
      <Footer />
      <CopyRight />
    </div>
  );
}

export default IndustryDetailPage;
