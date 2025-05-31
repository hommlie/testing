import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './IndustryNavbar.css';

const industryItems = [
  { name: 'Food Processing', slug: 'food-processing' },
  { name: 'Hotels', slug: 'hotels' },
  { name: 'Education', slug: 'education' },
  { name: 'Food Retail', slug: 'food-retail' },
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Construction', slug: 'construction' },
  { name: 'Retail', slug: 'retail' },
];

function IndustryNavbar() {
  const location = useLocation();

  return (
    <div className="industry-navbar-container">
      <div className="industry-navbar-content">
        <div className="industry-category-title">Industry Services</div>
        <div className="industry-links-container">
          {industryItems.map((item, index) => {
            const isActive = location.pathname === `/industries/${item.slug}`;
            return (
              <Link
                key={index}
                to={`/industries/${item.slug}`}
                className={`industry-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IndustryNavbar;
