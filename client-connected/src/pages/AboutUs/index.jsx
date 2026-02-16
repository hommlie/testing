import React, { useState, useEffect } from "react";
import fetchSettings from "../../config/settings";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Users,
  Leaf,
  Award,
  TrendingUp,
  Recycle,
  Zap,
  Briefcase,
  CheckCircle2,
  Globe2,
  Building2,
} from "lucide-react";

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const loadLogo = async () => {
      const data = await fetchSettings();
      if (data?.logo) {
        setLogo(data.logo);
      }
    };
    loadLogo();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    { name: "Residential Pest Control", icon: <ShieldCheck className="w-6 h-6" /> },
    { name: "Commercial Pest Control", icon: <Building2 className="w-6 h-6" /> },
    { name: "Termite Management", icon: <Briefcase className="w-6 h-6" /> },
    { name: "Cockroach Control (6D Prime Protocol)", icon: <Zap className="w-6 h-6" /> },
    { name: "Bedbug Heat & Steam Treatment", icon: <TrendingUp className="w-6 h-6" /> },
    { name: "Rodent Management", icon: <Target className="w-6 h-6" /> },
    { name: "Waste Management Solutions", icon: <Recycle className="w-6 h-6" /> },
    { name: "Annual Maintenance Contracts (AMC)", icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  const values = [
    "Integrity & Transparency",
    "Safety & Compliance First",
    "Process-Driven Excellence",
    "Women Empowerment & Leadership",
    "Continuous Training & Skill Development",
    "Long-Term Customer Partnerships",
  ];

  const operationalStrengths = [
    "Established training center in Bangalore",
    "40+ trained pest control professionals",
    "Digital job cards and complaint tracking systems",
    "SOP-based treatment execution",
    "PPE compliance and regulated chemical usage",
  ];

  const expansionVision = [
    "Pan-India Expansion",
    "Commercial Portfolio Scaling",
    "Technology-Integrated Monitoring Systems",
    "Strategic AMC Partnerships",
    "Skill Development Initiatives",
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>About Us - Hommlie | Corporate Profile</title>
        <meta
          name="description"
          content="Hommlie is a modern pest control and waste management company. We are women-led, process-driven, and technology-enabled."
        />
        <link rel="canonical" href="https://www.hommlie.com/about-us" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-white pt-10 pb-8 px-4 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hommlie/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto text-center relative z-10 max-w-4xl"
        >
          {/* Logo Container */}
          <div className="mb-6 flex justify-center">
            {logo ? (
              <img
                src={logo}
                alt="Hommlie"
                className="h-14 md:h-20 object-contain"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold font-headerFont tracking-tighter text-hommlie">
                HOMMLIE
              </h1>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 tracking-wider uppercase font-poppins">
            Corporate Profile
          </h2>

          {/* Features Row */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm font-medium text-gray-500 mb-8 font-poppins tracking-wide">
            <span className="flex items-center">
              Women-Led
            </span>
            <span className="text-hommlie">•</span>
            <span className="flex items-center">
              Process-Driven
            </span>
            <span className="text-hommlie">•</span>
            <span className="flex items-center">
              Technology-Enabled
            </span>
          </div>

          {/* Backed By */}
          <div className="inline-block relative">
            <div className="relative flex justify-center">
              <span className="bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full border border-gray-100 text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.15em] font-medium whitespace-nowrap shadow-sm">
                Backed by ADML Technoservices Pvt Ltd
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-12 space-y-20 max-w-6xl"
      >
        {/* About Section */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-1 w-12 bg-hommlie rounded-full"></div>
              <span className="text-hommlie font-bold uppercase tracking-wider text-sm">
                About Hommlie
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Redefining Hygiene & Pest Management
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Hommlie is a modern pest control and waste management company
              committed to delivering structured, science-backed, and safety-first
              solutions across residential and commercial segments.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Operating under <span className="font-semibold text-gray-800">ADML Technoservices Pvt Ltd</span>,
              Hommlie combines operational excellence, trained manpower, and
              technology-driven systems to redefine service standards in India.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-hommlie/5 rounded-full blur-3xl group-hover:bg-hommlie/10 transition-colors duration-500"></div>
            <div className="relative z-10 grid gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="bg-hommlie/10 p-3 rounded-lg">
                    <Target className="text-hommlie h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Mission</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To build India’s most trusted hygiene protection brand through
                  structured processes, trained professionals, and environmentally
                  responsible practices.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="bg-hommlie/10 p-3 rounded-lg">
                    <Globe2 className="text-hommlie h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Vision</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To become a pan-India leader in integrated pest management and
                  facility hygiene solutions, powered by technology, training
                  infrastructure, and operational excellence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <span className="text-hommlie font-bold uppercase tracking-wider text-sm block mb-2">
              What We Offer
            </span>
            <h3 className="text-3xl font-bold text-gray-900">Our Services</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-hommlie/30 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="mb-4 p-4 bg-gray-50 rounded-full group-hover:bg-hommlie group-hover:text-white transition-colors duration-300 text-hommlie">
                  {service.icon}
                </div>
                <h4 className="font-semibold text-gray-800 group-hover:text-hommlie transition-colors duration-300">
                  {service.name}
                </h4>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core Values & Strengths */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12">
          {/* Core Values */}
          <div className="bg-hommlie text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-white">
                <Award className="mr-3 h-6 w-6 text-white" /> Core Values
              </h3>
              <ul className="space-y-4">
                {values.map((value, idx) => (
                  <li key={idx} className="flex items-start text-white">
                    <CheckCircle2 className="mr-3 h-5 w-5 mt-0.5 flex-shrink-0 text-white" />
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operational Strength */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-hommlie/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                <Briefcase className="mr-3 h-6 w-6 text-hommlie" /> Operational Strength
              </h3>
              <ul className="space-y-5">
                {operationalStrengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start group">
                    <div className="bg-hommlie/10 p-1.5 rounded-full mr-4 group-hover:bg-hommlie group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-hommlie group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-700 font-medium">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Section */}
        <motion.div variants={itemVariants} className="bg-green-50 rounded-2xl p-8 md:p-12 border border-green-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-full shadow-lg">
                <Leaf className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability & CSR</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hommlie follows environmentally responsible pest management practices including
                controlled chemical application, low-toxicity solutions, waste segregation awareness,
                and responsible disposal protocols.
              </p>
              <p className="font-medium text-green-800">
                Sustainability remains central to our expansion strategy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Leadership & Vision */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12">
          {/* Leadership */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-1 w-12 bg-hommlie rounded-full"></div>
              <span className="text-hommlie font-bold uppercase tracking-wider text-sm">
                Leadership
              </span>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-hommlie/30 transition-all">
                <h4 className="text-lg font-bold text-gray-900">Divya N</h4>
                <p className="text-sm text-hommlie font-medium mb-2">Co-Founder</p>
                <p className="text-gray-600 text-sm">Strategic Growth & Operations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-hommlie/30 transition-all">
                <h4 className="text-lg font-bold text-gray-900">Lavanya</h4>
                <p className="text-sm text-hommlie font-medium mb-2">Co-Founder</p>
                <p className="text-gray-600 text-sm">Customer Experience & Service Innovation</p>
              </div>
              <p className="text-sm text-gray-500 italic mt-4 border-l-4 border-hommlie pl-4 py-1 bg-gray-50 rounded-r">
                "Hommlie is proudly a women-led enterprise committed to building structured,
                ethical, and scalable service systems in India."
              </p>
            </div>
          </div>

          {/* Expansion Vision */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-1 w-12 bg-hommlie rounded-full"></div>
              <span className="text-hommlie font-bold uppercase tracking-wider text-sm">
                Expansion Vision 2025–26
              </span>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-inner border border-gray-100">
              <ul className="space-y-4">
                {expansionVision.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-hommlie text-white rounded-full text-sm font-bold mr-4">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Closing Note */}
        <motion.div variants={itemVariants} className="text-center py-12 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 italic mb-6">
              "Hommlie is not just building a service company — we are building a national
              standard for hygiene protection, operational discipline, and customer trust."
            </h3>
            <div className="h-1 w-24 bg-hommlie mx-auto rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
