import React, { useState } from 'react';
import './BlogPage.css';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import TermiteImg from '../assets/seasontermites.png';
import BlogHeroImage from '../assets/blogbg1.png'; 
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

const BlogPage = () => {
  const pests = [
    { 
      name: 'Cockroach Control – Eliminate Disease-Spreading Pests', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Cockroaches are resilient pests that can spread diseases and trigger allergies. Our professional extermination methods eliminate infestations effectively.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-15'
    },
    { 
      name: 'Termite Control – Protect Your Property from Structural Damage', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Silent destroyers that can cause extensive structural damage. We offer comprehensive termite inspection and treatment solutions.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-10'
    },
    { 
      name: 'Fly Control – Maintain a Hygienic Environment', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Flies carry numerous pathogens and contaminate food. Our fly control services create hygienic environments for your business.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-05'
    },
    { 
      name: 'Ant Control – Eliminate Colonies at the Source', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Ant colonies can invade premises quickly. Our targeted treatments eliminate ants at the source and prevent re-infestation.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-20'
    },
    { 
      name: 'Mosquito Control – Prevent Disease Transmission', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Disease-carrying mosquitoes threaten public health. Our mosquito management includes fogging and breeding site elimination.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-12'
    },
    { 
      name: 'Rat Control – Protect Your Property from Rodent Damage', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Rodents damage property and spread diseases. Our rat control combines trapping, baiting, and exclusion techniques.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-18'
    },
    { 
      name: 'Bed Bug Control – Complete Eradication Solutions', 
      image: TermiteImg, 
      category: 'cleaning',
      description: 'Bed bugs cause itchy bites and sleep disturbances. Our heat treatments and insecticides completely eradicate bed bug infestations.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-22'
    },
    { 
      name: 'Spider Control – Safe Removal Services', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'While most spiders are harmless, some can be dangerous. We safely remove spiders and their webs from your premises.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-08'
    },
    { 
      name: 'Bird Control – Humane Deterrent Solutions', 
      image: TermiteImg, 
      category: 'netting',
      description: 'Bird droppings damage buildings and spread diseases. Our bird control solutions include netting, spikes, and deterrents.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-25'
    },
    { 
      name: 'Mice Control – Integrated Pest Management', 
      image: TermiteImg, 
      category: 'pest control',
      description: 'Mice contaminate food and chew through wires. Our integrated pest management controls mice populations effectively.',
      phone: '636-386-5658',
      link: '#',
      date: '2025-05-30'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const filteredPests = pests.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || pest.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Group posts by month for archive
  const archivePosts = pests.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});

  // Get archive months (currently only May 2025)
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
          <h1>Industrial Pest Solutions</h1>             <p className="bp-hero-text">               Specialized pest management services designed for businesses to maintain hygiene standards,                comply with regulations, and protect your reputation.             </p>
          <div className="bp-contact-btns">
            <a href="tel:+916363865658" className="bp-btn bp-btn-call">
              📞 Call Us: 63638 65658
            </a>
            <a href="https://wa.me/916363865658" className="bp-btn bp-btn-whatsapp">
              💬 Chat on WhatsApp
            </a>
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
            
            {/* Search and Filter Container */}
            <div className="bp-controls">
              <div className="bp-search-wrapper">
                <div className="bp-search-box">
                  <svg className="bp-search-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search services..." 
                    className="bp-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="bp-search-clear"
                      onClick={() => setSearchTerm('')}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bp-filter-wrapper">
                <button 
                  className="bp-filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span>{filter === 'all' ? 'All Services' : filter.replace('_', ' ')}</span>
                  <svg className={`bp-filter-arrow ${showFilters ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {showFilters && (
                  <div className="bp-filter-dropdown">
                    <button 
                      className={`bp-filter-opt ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => {
                        setFilter('all');
                        setShowFilters(false);
                      }}
                    >
                      All Services
                    </button>
                    <button 
                      className={`bp-filter-opt ${filter === 'pest control' ? 'active' : ''}`}
                      onClick={() => {
                        setFilter('pest control');
                        setShowFilters(false);
                      }}
                    >
                      Pest Control
                    </button>
                    <button 
                      className={`bp-filter-opt ${filter === 'cleaning' ? 'active' : ''}`}
                      onClick={() => {
                        setFilter('cleaning');
                        setShowFilters(false);
                      }}
                    >
                      Cleaning
                    </button>
                    <button 
                      className={`bp-filter-opt ${filter === 'netting' ? 'active' : ''}`}
                      onClick={() => {
                        setFilter('netting');
                        setShowFilters(false);
                      }}
                    >
                      Netting
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Pest Grid */}
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
                      <p className="bp-card-desc">
                        {pest.description}
                      </p>
                      <div className="bp-card-footer">
                        <a href={`tel:${pest.phone}`} className="bp-card-phone">
                          <svg className="bp-phone-icon" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                          </svg>
                          {pest.phone}
                        </a>
                        <a href={pest.link} className="bp-card-link">Read more →</a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bp-empty">
                  <p>No services found matching your criteria.</p>
                  <button 
                    className="bp-reset-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                  >
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
            <button 
              className="bp-archive-toggle"
              onClick={() => setShowArchive(!showArchive)}
            >
              <span>May 2025</span>
              <svg className={`bp-archive-arrow ${showArchive ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            
            {showArchive && (
              <div className="bp-archive-months">
                {archiveMonths.map((month, index) => (
                  <div key={index} className="bp-archive-month">
                    <h4>{month}</h4>
                    <ul className="bp-archive-posts">
                      {archivePosts[month].map((post, postIndex) => (
                        <li key={postIndex}>
                          <a href={post.link} className="bp-archive-post-link">{post.name}</a>
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