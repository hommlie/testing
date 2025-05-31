import React from 'react';
import BranchHeader from '../components/BranchHeader';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import IndustryNavbar from '../components/IndustryNavbar'
import IndustryHeroSection from '../components/IndustryHeroSection';
import IndustryLocalSupport from '../components/IndustryLocalSupport'
import IndustryServices from '../components/IndustryServices';
import ContactForm from '../components/ContactForm'
import IconSection from '../components/IconSection';
import TrendingPests from '../components/TrendingPests';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

function IndustriesPage(){
 return (
    <>
        <BranchHeader />
        <Header />
        <Navbar />
        {/* <IndustryNavbar /> */}
        <IndustryHeroSection />
        <br />
        <IndustryNavbar />
        <IndustryLocalSupport />
        <IndustryServices />
        <ContactForm />
        <IconSection/>
        <TrendingPests />
        <FaqSection />
        <Footer />
        <CopyRight />
    </>
  );
}

export default IndustriesPage