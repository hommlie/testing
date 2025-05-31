import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PestCategoryNavbar.css';

const pestList = [
  { name: 'Cockroaches', slug: 'cockroaches' },
  { name: 'Termites', slug: 'termites' },
  { name: 'Rats', slug: 'rats' },
  { name: 'Snakes', slug: 'snakes' },
  { name: 'Mosquitoes', slug: 'mosquitoes' },
  { name: 'Mice', slug: 'mice' },
  { name: 'Flies', slug: 'flies' },
  { name: 'Bed bugs', slug: 'bed-bugs' },
  { name: 'Spiders', slug: 'spiders' },
  { name: 'Ants', slug: 'ants' }
];

function PestCategorySlider() {
  const location = useLocation();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-inner">
        <div className="slider-title">Home Pest Services</div>
        <button className="slider-btn left-btn" onClick={scrollLeft}>&lt;</button>
        <div className="slider-track" ref={scrollRef}>
          {pestList.map((item, index) => {
            const isActive = location.pathname === `/services/${item.slug}`;
            return (
              <Link
                key={index}
                to={`/services/${item.slug}`}
                className={`slider-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <button className="slider-btn right-btn" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
}

export default PestCategorySlider;
