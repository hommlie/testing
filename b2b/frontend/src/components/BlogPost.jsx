import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';
import BranchHeader from './BranchHeader';
import Header from './Header';
import Navbar from './Navbar';
import FaqSection from './FaqSection';
import Footer from './Footer';
import CopyRight from './CopyRight';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const [config, setConfig] = useState(null);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    fetch('/api/inspection/config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error('Error loading config:', err));
  }, []);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <p>The requested blog post could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="blog-post">
      {/* Fixed Header */}
      <div className="header-wrapper">
        <BranchHeader />
        <div className="header-transparent">
          <Header transparent={true} />
        </div>
        <Navbar />
      </div>

      {/* Blog Content Header */}
      <div className="blog-content-container">
        <div className="blog-header-container">
          <div className="breadcrumb">
            <span><a href="/blog">Home</a></span>
            <span className="separator"> &gt; </span>
            <span>{post.category}</span>
            <span className="separator"> &gt; </span>
            <span>{post.name}</span>
          </div>

          <h1 className="blog-title">{post.name}</h1>

          <div className="blog-meta">
            <span className="author">{post.author || 'Hommlie Expert'}</span>
            <span className="date">{post.date || 'Updated Recently'}</span>
          </div>
        </div>

        {/* Blog Hero Image */}
        <div className="hero-image-container">
          <img src={post.image} alt={post.name} className="hero-image" />
        </div>
      </div>

      {/* Inline Form */}
      {config && (
        <div className="inline-form-wrapper">
          <form className="inline-form-group">
            <input type="text" placeholder="Name *" required />
            <input type="tel" placeholder="Mobile Number *" required />
            <input type="text" placeholder="Pincode *" required />
            <select required defaultValue="">
              <option value="" disabled hidden>
                Interested in? *
              </option>
              {config?.segmentOptions?.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Blog HTML Content */}
      <div className="blog-main-content">
        <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
      </div>

      {/* Footer */}
      <FaqSection />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default BlogPost;
