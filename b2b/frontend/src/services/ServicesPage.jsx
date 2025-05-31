import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import PestCategoryNavbar from '../components/PestCategoryNavbar';
import HeroSection from '../components/HeroSection';
import PestServicesTabs from '../components/PestServicesTabs';
import PestServices from '../components/PestServices';
import IconSection from '../components/IconSection'
import ContactForm from '../components/ContactForm'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'
import CopyRight from '../components/CopyRight'
import PestServicesPart from '../components/PestServicesPart';
import TrendingPests from '../components/TrendingPests';

function ServicesPage() {
  return (
    <>
      <BranchHeader />
      <Header />
      <Navbar />
      
      <HeroSection />
      <br/>
      <PestCategoryNavbar />
      <PestServicesTabs />
      <PestServices />
      <PestServicesPart />
      <br />
      <IconSection />
      <br />
      <ContactForm />
      <br />
      <TrendingPests />
      <FaqSection />
      <br />
      <Footer />
      <CopyRight />
    </>
  );
}

export default ServicesPage;
