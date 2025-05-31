import React, { useState, useRef, useEffect } from 'react';
import './VideoSection.css';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import heroBackground from '../assets/pestlibrarybg1.png'; // Make sure to add this image to your assets

const VideoSection = () => {
  const pests = [
    { name: 'Cockroach Control – Eliminate Disease-Spreading Pests' },
    { name: 'Termite Control – Protect Your Property from Structural Damage' },
    { name: 'Fly Control – Maintain a Hygienic Environment' },
    { name: 'Ant Control – Eliminate Colonies at the Source' },
    { name: 'Mosquito Control – Prevent Disease Transmission' },
    { name: 'Rat Control – Protect Your Property from Rodent Damage' },
    { name: 'Bed Bug Control – Complete Eradication Solutions' },
    { name: 'Spider Control – Safe Removal Services' },
    { name: 'Bird Control – Humane Deterrent Solutions' },
    { name: 'Mice Control – Integrated Pest Management' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const videoRefs = useRef([]);
  const players = useRef([]);

  useEffect(() => {
    // Load YouTube Iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      videoRefs.current.forEach((iframe, i) => {
        if (iframe) {
          players.current[i] = new window.YT.Player(iframe, {
            events: {
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  players.current.forEach((player, j) => {
                    if (j !== i && player?.pauseVideo) {
                      player.pauseVideo();
                    }
                  });
                }
              },
            },
          });
        }
      });
    };
  }, []);

  const filteredPests = pests.filter((pest) =>
    pest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <BranchHeader />
      <Header transparent />
      <Navbar />

      <section 
        className="blog-hero-section"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <div className="blog-hero-text">
            <h1>Industrial Pest Solutions</h1>
            <p className="blog-hero-description">
              Specialized pest management services designed for businesses to maintain hygiene
              standards, comply with regulations, and protect your reputation.
            </p>
          </div>
          <div className="blog-contact-buttons">
            <a href="tel:+916363865658" className="blog-contact-button blog-phone">
              📞 Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="blog-contact-button blog-whatsapp">
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="blog-pest-section">
        <div className="blog-pest-container">
          <h2 className="blog-section-title">Our Pest Control Services</h2>

          <div className="blog-search-container">
            <input
              type="text"
              placeholder="Search pests..."
              className="blog-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="blog-services-grid">
            {filteredPests.length > 0 ? (
              filteredPests.map((pest, index) => (
                <article className="video-card" key={index}>
                  <div className="video-wrapper">
                    <iframe
                      ref={(el) => (videoRefs.current[index] = el)}
                      id={`video-${index}`}
                      src="https://www.youtube.com/embed/WuMuCWBXtxM?enablejsapi=1"
                      title={pest.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="video-title">{pest.name}</h3>
                </article>
              ))
            ) : (
              <div className="blog-no-results">
                <p>No services found matching your search.</p>
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

export default VideoSection;