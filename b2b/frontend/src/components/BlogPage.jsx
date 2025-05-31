import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BlogHeroImage from '../assets/blogbg1.png';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import { blogPosts } from '../data/blogData';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const filteredPests = blogPosts.filter(post => {
    const matchesSearch =
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || post.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleReadMore = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  const archivePosts = blogPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});

  const archiveMonths = Object.keys(archivePosts).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <>
      <BranchHeader />
      <Header transparent={true} />
      <Navbar />

      {/* Hero Section */}
      <section className="bp-hero">
        <div className="bp-hero-image-container">
          <img src={BlogHeroImage} alt="Professional pest control service" className="bp-hero-image" />
          <div className="bp-hero-overlay"></div>
        </div>
        <div className="bp-hero-content">
          <h1>Industrial Pest Solutions</h1>
          <p className="bp-hero-text">
            Specialized pest management services designed for businesses to maintain hygiene standards,
            comply with regulations, and protect your reputation.
          </p>
          <div className="bp-contact-btns">
            <a href="tel:+916363865658" className="bp-btn bp-btn-call">📞 Call Us: 63638 65658</a>
            <a href="https://wa.me/916363865658" className="bp-btn bp-btn-whatsapp">💬 Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bp-main-container">
        {/* Pest Grid Section */}
        <section className="bp-services">
          <div className="bp-container">
            <div className="bp-header">
              <h2>Our Pest Control Services</h2>
              <p className="bp-subtitle">Professional solutions for all types of pests</p>
            </div>

            {/* Search and Filter */}
            <div className="bp-controls">
              <div className="bp-search-wrapper">
                <div className="bp-search-box">
                  <svg className="bp-search-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="bp-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button className="bp-search-clear" onClick={() => setSearchTerm('')}>
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="bp-filter-wrapper">
                <button className="bp-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                  <span>{filter === 'all' ? 'All Services' : filter}</span>
                  <svg className={`bp-filter-arrow ${showFilters ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                {showFilters && (
                  <div className="bp-filter-dropdown">
                    {['all', 'pest control', 'cleaning', 'netting'].map((option) => (
                      <button
                        key={option}
                        className={`bp-filter-opt ${filter === option ? 'active' : ''}`}
                        onClick={() => {
                          setFilter(option);
                          setShowFilters(false);
                        }}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Blog Cards */}
            <div className="bp-grid">
              {filteredPests.length > 0 ? (
                filteredPests.map((pest, index) => (
                  <article className="bp-card" key={index}>
                    <div className="bp-card-img-container">
                      <img src={pest.image} alt={pest.name} className="bp-card-img" />
                      <span className="bp-card-tag">{pest.category}</span>
                    </div>
                    <div className="bp-card-body">
                      <h3 className="bp-card-title">{pest.name}</h3>
                      <p className="bp-card-desc">{pest.description}</p>
                      <div className="bp-card-footer">
                        <a href={`tel:${pest.phone}`} className="bp-card-phone">{pest.phone}</a>
                        <button className="bp-view-more" onClick={() => handleReadMore(pest)}>View More</button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bp-empty">
                  <p>No services found matching your criteria.</p>
                  <button className="bp-reset-btn" onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}>
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Archive Sidebar */}
        <aside className="bp-archive-sidebar">
          <div className="bp-archive-container">
            <h3 className="bp-archive-title">Blog Archive</h3>
            <button className="bp-archive-toggle" onClick={() => setShowArchive(!showArchive)}>
              <span>May 2025</span>
              <svg className={`bp-archive-arrow ${showArchive ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            {showArchive && (
              <div className="bp-archive-months">
                {archiveMonths.map((month, index) => (
                  <div key={index} className="bp-archive-month">
                    <h4>{month}</h4>
                    <ul className="bp-archive-posts">
                      {archivePosts[month].map((post, idx) => (
                        <li key={idx}>
                          <button className="bp-archive-post-link" onClick={() => handleReadMore(post)}>
                            {post.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <ContactForm />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );
};

export default BlogPage;
