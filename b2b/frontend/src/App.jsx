import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IconContext } from 'react-icons';
import Layout from './components/Layout';

// Components
import BranchHeader from './components/BranchHeader';
import Header from './components/Header';
import Navbar from './components/Navbar';
import InspectionSection from './components/InspectionSection';
import SmartSection from './components/SmartSection';
import PestSectorGrid from './components/PestSectorGrid';
import PestManagement from './components/PestManagement';
import IconSection from './components/IconSection';
import ClientLogoSection from './components/ClientLogoSection';
import ReviewCarousel from './components/ReviewCarousel';
import ContactForm from './components/ContactForm';
import PestCards from './components/PestCards';
import TrendingPests from './components/TrendingPests';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CopyRight from './components/CopyRight';
import PestPage from './components/PestPage';
import ServicesPage from './services/ServicesPage';
import IndustriesPage from './industries/IndustriesPart';
import IndustryDetailPage from './components/IndustryDetailPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import CaseStudiesPage from './components/CaseStudiesPage';
import PestLibraryPage from './components/PestLibraryPage';
import VideoSection from './components/VideoSection';
import TermiteControlPage from './components/TermiteControlPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TermiteInspection from './components/TermiteInspection';
import TreatmentMethods from './components/TreatmentMethods';
import TermiteBarriers from './components/TermiteBarriers';
import Preventiontips from './components/Preventiontips';
import Termitefaq from './components/Termitefaq';
import TermiteTypes from './components/TermiteTypes';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Resources from './components/Resources';

function App() {
  const [message, setMessage] = useState('');
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch('/api/header/config')
      .then(res => res.json())
      .then(setHeaderData)
      .catch(err => console.error("Failed to load header config:", err));
  }, []);

  const HomePage = () => (
    <>
      <BranchHeader />
      <Header headerData={headerData} />
      <Navbar headerData={headerData} />
      <InspectionSection />
      <SmartSection />
      <PestSectorGrid />
      <PestManagement />
      <IconSection />
      <ClientLogoSection />
      <ReviewCarousel />
      <ContactForm />
      <PestCards />
      <TrendingPests />
      <FaqSection />
      <Footer />
      <CopyRight />
    </>
  );

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<PestPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/case-studies" element={<CaseStudiesPage />} />
          <Route path="/resources/pest-library" element={<PestLibraryPage />} />
          <Route path="/resources/videos" element={<VideoSection />} />
          <Route path="/termite-control" element={<TermiteControlPage />} />
          <Route path="/termite-control/termite-inspection" element={<TermiteInspection />} />
          <Route path="/termite-control/termite-methods" element={<TreatmentMethods />} />
          <Route path="/termite-control/termite-barriers" element={<TermiteBarriers />} />
          <Route path="/termite-control/prevention-tips" element={<Preventiontips />} />
          <Route path="/termite-control/termite-faq" element={<Termitefaq />} />
          <Route path="/termite-control/termite-types" element={<TermiteTypes />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Layout>
    </IconContext.Provider>
  );
}

export default App;
