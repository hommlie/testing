import React, { useState } from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import './termitefaq.css';

const faqData = [
  {
    question: "What are signs of a termite infestation?",
    answer:
      "Common signs include mud tubes on walls, hollow-sounding wood, discarded wings, and frass (termite droppings). Early detection is crucial to prevent major damage.",
  },
  {
    question: "What termite treatments do you offer?",
    answer:
      "We offer chemical soil barriers, baiting systems, reticulation networks, and more. Our professionals recommend solutions based on the property condition and infestation severity.",
  },
  {
    question: "Are the termite treatments safe for kids and pets?",
    answer:
      "Yes, all our treatments are eco-friendly and applied with utmost care to ensure safety for your family and pets.",
  },
  {
    question: "How often should I get a termite inspection?",
    answer:
      "It’s recommended to get a professional termite inspection at least once a year to stay ahead of any potential problems.",
  },
  {
    question: "How long does the treatment last?",
    answer:
      "Depending on the method, treatments can last from 1 to 8 years. We also offer renewable plans for long-term protection.",
  },
];

const TermiteFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <BranchHeader />
      <div className="headc">
        <Header />
      </div>
      <Navbar />

      <div className="faq-container">
        <h2>Termite Control FAQs</h2>
        <p className="faq-subtitle">Get expert answers to your most common termite-related questions.</p>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
              <button className="faq-question" onClick={() => toggleIndex(index)}>
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

      <section className="termite-faq-contact">
        <h2>Still Have Questions?</h2>
        <p>Get in touch with our termite experts to protect your home or business.</p>
        <div className="termite-faq-buttons">
          <a href="tel:+916363865658" className="termite-faq-btn call">Call: 63638 65658</a>
          <a href="mailto:reach@hommlie.com" className="termite-faq-btn email">Email Us</a>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <CopyRight />
    </>
  );
};

export default TermiteFAQ;
