import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import CopyRight from './CopyRight';

const ContactUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/contactus')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching contact us data:', err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="contactus-hero">
        <BranchHeader />
        <Header />
        <Navbar />
        <div className="contactus-hero-content">
          <h1>{data.header.title}</h1>
          <p>{data.header.subtitle}</p>
        </div>
      </div>
      
      <div className="contactus-container">
        <div className="contactus-content">
          <div className="contactus-form-section">
            <h2>{data.formTitle}</h2>
            <form className="contactus-form">
              <div className="contactus-form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="contactus-form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="contactus-form-group">
                <textarea name="message" placeholder="Your Message" rows="6" required />
              </div>
              <button type="submit" className="contactus-submit-btn">Send Message</button>
            </form>
          </div>

          <div className="contactus-info-section">
            <h2>{data.contactInfoTitle}</h2>
            <ul className="contactus-info-list">
              <li>
                <strong>📞 Phone:</strong>{' '}
                <a href={`tel:${data.contactDetails.phone}`} className="contactus-link">
                  {data.contactDetails.phone}
                </a>
              </li>
              <li>
                <strong>📧 Email:</strong>{' '}
                <a href={`mailto:${data.contactDetails.email}`} className="contactus-link">
                  {data.contactDetails.email}
                </a>
              </li>
              <li><strong>🕘 Hours:</strong> {data.contactDetails.hours}</li>
              <li><strong>📍 Address:</strong> {data.contactDetails.address}</li>
            </ul>

            <div className="contactus-map">
              <h2>{data.mapTitle}</h2>
              <div className="map-responsive">
                <iframe
                  title="Hommlie Location"
                  src={data.mapEmbedUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </>
  );
};

export default ContactUs;