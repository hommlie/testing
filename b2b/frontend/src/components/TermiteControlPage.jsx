import React, { useEffect, useState } from 'react';
import './TermiteControlPage.css';
import { Link } from 'react-router-dom';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import MobileNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import IconSection from '../components/IconSection';
import ContactForm from '../components/ContactForm'; // ✅ Use this

function TermiteNavbar() {
  const termiteNavItems = [
    { name: 'Signs of Infestation', slug: 'termite-inspection' },
    { name: 'Treatment Methods', slug: 'termite-methods' },
    { name: 'Termite Barriers', slug: 'termite-barriers' },
    { name: 'Prevention Tips', slug: 'prevention-tips' },
    { name: 'Termite FAQ', slug: 'termite-faq' },
    { name: 'Termite Types', slug: 'termite-types' },
  ];

  return (
    <div className="termite-navbar-container">
      <div className="termite-navbar-content">
        <div className="termite-category-title">Termite Services</div>
        <div className="termite-links-container">
          {termiteNavItems.map((item, index) => (
            <Link
              key={index}
              to={`/termite-control/${item.slug}`}
              className="termite-link"
              activeClassName="active"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const TermiteControlPage = () => {
  const [pageData, setPageData] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('/api/termite/config')
      .then(res => res.json())
      .then(setPageData)
      .catch(err => console.error('Failed to load termite page data:', err));

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  if (!pageData) return <div>Loading termite control page...</div>;

  return (
    <div className="termite-page-container">
      <BranchHeader />
      <div className={`fixed-header-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <Header />
      </div>
      <MobileNavbar />
      <div className="page-content-wrapper">
        <div className="termite-hero-banner">
          <div className="hero-overlay">
            <div className="hero-content termite-hero-text">
              <h1 className="termite-hero-heading">{pageData.hero?.title}</h1>
              <p className="termite-hero-description">{pageData.hero?.description}</p>
              <div className="contact-buttons">
                <a href={`tel:+91${pageData.hero?.phone}`} className="contact-button phone">
                  📞 Call Us: {pageData.hero?.phone}
                </a>
                <a
                  href={`https://wa.me/${pageData.hero?.whatsapp}`}
                  className="contact-button whatsapp"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <TermiteNavbar />

        <main className="termite-main-content">
          <section className="termite-services-section">
            <div className="section-header">
              <h2>{pageData.servicesHeading}</h2>
              <p className="section-subtitle">{pageData.servicesSubtitle}</p>
            </div>

            <div className="services-grid">
              {pageData.services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <IconSection
            title={pageData.iconSectionTitle}
            subtitle={pageData.iconSectionSubtitle}
          />

          <section className="termite-process-section">
            <div className="section-header">
              <h2>{pageData.processHeading}</h2>
              <p className="section-subtitle">{pageData.processSubtitle}</p>
            </div>

            <div className="process-steps">
              {pageData.process.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Imported Contact Form Here */}
            <ContactForm />
          </section>

          <section className="termite-contact-section">
            <TrendingPests />
            <FaqSection />
          </section>
        </main>
      </div>
      <Footer />
      <CopyRight />
    </div>
  );
};

function TrendingPests() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/trending/config')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load trending pests:', err));
  }, []);

  if (!data) return <div>Loading trending pests...</div>;

  return (
    <section className="modern-pest-trending">
      <div className="modern-trending-header">
        <h2>{data.heading}</h2>
        <p className="modern-trending-subtitle">
          {data.subtitle}
          <span>
            {' '}
            <a href="#" className="modern-inline-link">
              Contact us online
            </a>{' '}
            or call us at{' '}
            <a href={`tel:${data.pests[0]?.phone}`} className="modern-inline-link">
              {data.pests[0]?.phone}
            </a>{' '}
            to avail a pest survey of your premises.
          </span>
        </p>
      </div>

      <div className="modern-trending-grid">
        {data.pests.map((pest, index) => (
          <article className="modern-trending-card" key={index}>
            <div className="modern-trending-image-container">
              <img src={pest.img} alt={pest.name} className="modern-trending-image" />
            </div>
            <div className="modern-trending-content">
              <h3>{pest.name}</h3>
              <p className="modern-trending-description">
                {pest.description} Contact us at{' '}
                <a href={`tel:${pest.phone}`} className="modern-trending-phone">
                  {pest.phone}
                </a>{' '}
                to book your service.
              </p>
              <a href={pest.link} className="modern-trending-link">
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch('/api/faq/config')
      .then(res => res.json())
      .then(data => {
        setFaqData(data.faqs);
        setHeading(data.heading);
        setSubtitle(data.subtitle);
      })
      .catch(err => console.error('Failed to load FAQs:', err));
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqData.length) return <div>Loading FAQs...</div>;

  return (
    <div className="faq-container">
      <h2>{heading}</h2>
      <p className="faq-subtitle">{subtitle}</p>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermiteControlPage;
