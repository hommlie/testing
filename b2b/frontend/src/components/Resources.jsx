import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFileAlt, FaVideo, FaBlog, FaDownload } from 'react-icons/fa';
import './Resources.css';

const Resources = () => {
  const resourceData = {
    blogPosts: [
      {
        id: 1,
        title: 'How to Prevent Termite Infestations in Your Home',
        excerpt: 'Learn the best practices to protect your home from termites and save thousands in repair costs.',
        date: 'May 15, 2023',
        category: 'Termite Control',
        readTime: '5 min read',
        image: '#' // placeholder
      },
      {
        id: 2,
        title: 'The Complete Guide to Cockroach Control',
        excerpt: 'Discover effective methods to eliminate cockroaches and prevent future infestations.',
        date: 'April 28, 2023',
        category: 'Pest Control',
        readTime: '7 min read',
        image: '#'
      },
      {
        id: 3,
        title: 'Natural Remedies for Common Household Pests',
        excerpt: 'Eco-friendly solutions to deal with pests without using harsh chemicals.',
        date: 'March 10, 2023',
        category: 'Natural Solutions',
        readTime: '6 min read',
        image: '#'
      }
    ],
    caseStudies: [
      {
        id: 1,
        title: 'Hotel Chain Pest Management Success Story',
        excerpt: 'How we helped a 5-star hotel chain maintain pest-free environments across all locations.',
        location: 'Bangalore, India',
        results: '100% pest-free audits for 2 years',
        image: '#'
      },
      {
        id: 2,
        title: 'Food Processing Plant Rodent Control',
        excerpt: 'Our comprehensive solution for a major food processing facility facing rodent issues.',
        location: 'Mumbai, India',
        results: 'Zero rodent sightings in 18 months',
        image: '#'
      }
    ],
    pestLibrary: [
      {
        id: 1,
        name: 'German Cockroach',
        scientificName: 'Blattella germanica',
        description: 'Small, light brown cockroaches that prefer warm, humid environments near food and water sources.',
        image: '#'
      },
      {
        id: 2,
        name: 'Termites',
        scientificName: 'Isoptera',
        description: 'Wood-destroying insects that can cause significant structural damage if left untreated.',
        image: '#'
      },
      {
        id: 3,
        name: 'House Flies',
        scientificName: 'Musca domestica',
        description: 'Common flies that can spread diseases by contaminating food and surfaces.',
        image: '#'
      },
      {
        id: 4,
        name: 'Bed Bugs',
        scientificName: 'Cimex lectularius',
        description: 'Small, nocturnal insects that feed on human blood and can cause itchy bites.',
        image: '#'
      }
    ],
    videos: [
      {
        id: 1,
        title: 'How Our Pest Control Process Works',
        duration: '2:45',
        thumbnail: '#',
        views: '1.2K',
        url: '#'
      },
      {
        id: 2,
        title: 'Customer Testimonial - Residential Service',
        duration: '1:30',
        thumbnail: '#',
        views: '856',
        url: '#'
      },
      {
        id: 3,
        title: 'Termite Inspection Demonstration',
        duration: '3:15',
        thumbnail: '#',
        views: '1.5K',
        url: '#'
      }
    ]
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, null, `#${sectionId}`);
    }
  };

  return (
    <div className="resources-container">
      <div className="resources-hero">
        <div className="hero-content">
          <h1>Resources Hub</h1>
          <p>Your comprehensive guide to pest control knowledge, tips, and solutions</p>
        </div>
      </div>

      <div className="resource-nav">
        <a href="#blog" className="resource-nav-item active" onClick={(e) => scrollToSection(e, 'blog')}>
          <FaBlog className="nav-icon" /> Blog
        </a>
        <a href="#case-studies" className="resource-nav-item" onClick={(e) => scrollToSection(e, 'case-studies')}>
          <FaFileAlt className="nav-icon" /> Case Studies
        </a>
        <a href="#pest-library" className="resource-nav-item" onClick={(e) => scrollToSection(e, 'pest-library')}>
          <FaBook className="nav-icon" /> Pest Library
        </a>
        <a href="#videos" className="resource-nav-item" onClick={(e) => scrollToSection(e, 'videos')}>
          <FaVideo className="nav-icon" /> Videos
        </a>
      </div>

      {/* Blog Section */}
      <section id="blog" className="resource-section">
        <div className="section-header">
          <h2><FaBlog className="section-icon" /> Blog Articles</h2>
          <p>Stay informed with our latest pest control tips and industry insights</p>
        </div>
        <div className="blog-grid">
          {resourceData.blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }}></div>
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/blog" className="view-all-btn">View All Blog Posts</Link>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="resource-section">
        <div className="section-header">
          <h2><FaFileAlt className="section-icon" /> Case Studies</h2>
          <p>Real-world examples of our pest control solutions in action</p>
        </div>
        <div className="case-studies-grid">
          {resourceData.caseStudies.map(study => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-image" style={{ backgroundImage: `url(${study.image})` }}></div>
              <div className="case-study-content">
                <h3>{study.title}</h3>
                <p className="case-study-excerpt">{study.excerpt}</p>
                <div className="case-study-details">
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{study.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Results:</span>
                    <span className="detail-value">{study.results}</span>
                  </div>
                </div>
                <Link to={`/case-studies/${study.id}`} className="read-more">View Case Study</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/case-studies" className="view-all-btn">View All Case Studies</Link>
        </div>
      </section>

      {/* Pest Library Section */}
      <section id="pest-library" className="resource-section">
        <div className="section-header">
          <h2><FaBook className="section-icon" /> Pest Library</h2>
          <p>Comprehensive information about common pests and how to control them</p>
        </div>
        <div className="pest-library-grid">
          {resourceData.pestLibrary.map(pest => (
            <div key={pest.id} className="pest-card">
              <div className="pest-image" style={{ backgroundImage: `url(${pest.image})` }}></div>
              <div className="pest-content">
                <h3>{pest.name}</h3>
                <p className="scientific-name">{pest.scientificName}</p>
                <p className="pest-description">{pest.description}</p>
                <Link to={`/pest-library/${pest.id}`} className="learn-more">Learn More</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/pest-library" className="view-all-btn">Browse Full Pest Library</Link>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="resource-section">
        <div className="section-header">
          <h2><FaVideo className="section-icon" /> Videos</h2>
          <p>Watch our pest control experts in action and learn through visual demonstrations</p>
        </div>
        <div className="videos-grid">
          {resourceData.videos.map(video => (
            <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="video-card">
              <div className="video-thumbnail" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                <div className="play-button"></div>
                <span className="video-duration">{video.duration}</span>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <span className="video-views">{video.views} views</span>
              </div>
            </a>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/videos" className="view-all-btn">View All Videos</Link>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section">
        <div className="download-card">
          <div className="download-content">
            <h3>Download Our Complete Resource Guide</h3>
            <p>Get our comprehensive pest control guide with prevention tips, treatment methods, and more.</p>
            <a href="#" className="download-btn">
              <FaDownload className="download-icon" /> Download Brochure
            </a>
          </div>
          <div className="download-image"></div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
