import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import BranchHeader from "../components/BranchHeader";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import CopyRight from "./CopyRight";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/api/aboutus")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to fetch AboutUs data", err));
  }, []);

  if (!aboutData) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="aboutus-hero">
        <BranchHeader />
        <Header />
        <Navbar />
        <div className="aboutus-hero-content">
          <h1>{aboutData.hero.title}</h1>
          <p>{aboutData.hero.subtitle}</p>
        </div>
      </div>

      <div className="aboutus-container">
        <section className="aboutus-main">
          {aboutData.sections.map((section, index) => (
            <div className="aboutus-card" key={index}>
              <h2>{section.title}</h2>
              {section.content && <p>{section.content}</p>}
              {section.bullets && (
                <ul>
                  {section.bullets.map((point, idx) => (
                    <li key={idx}>✅ {point}</li>
                  ))}
                </ul>
              )}
              {section.linkText && section.linkHref && (
                <p>
                  <a href={section.linkHref} className="aboutus-link">
                    {section.linkText}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
      <Footer />
      <CopyRight />
    </>
  );
};

export default AboutUs;
