import React, { useState, useEffect } from 'react';
import './ReviewCarousel.css';

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(getReviewsPerPage());

  function getReviewsPerPage() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  useEffect(() => {
    fetch('/api/reviews/config')
      .then(res => res.json())
      .then(setReviews)
      .catch(err => console.error("Failed to load reviews:", err));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setReviewsPerPage(getReviewsPerPage());
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = currentIndex * reviewsPerPage;
  const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  if (!reviews.length) return <div>Loading reviews...</div>;

  return (
    <div className="carousel-container">
      <h2>What Our Clients Say</h2>
      <br />
      <div className="carousel-content mt-2">
        <div className="reviews-wrapper">
          {visibleReviews.map((review, index) => (
            <div key={index} className="review-card">
              <p>"{review.text}"</p>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <div className="reviewer">
                <div className="avatar"></div>
                <div className="reviewer-info">
                  <strong>{review.name}</strong>
                  <div>{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
