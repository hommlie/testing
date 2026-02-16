import React, { useState, useRef } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';
import { motion } from "framer-motion";

const PartnerWithUs = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${config.API_URL}/api/createpartnerform`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                successNotify('Thank you! Our team will contact you soon!');
                setFormData({ name: '', mobile: '', message: '' });
            } else {
                errorNotify('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            errorNotify('An error occurred. Please try again later.');
        }
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const categories = [
        { title: "AC & appliance technicians", description: "Installation, repairs, maintenance, servicing, cleaning" },
        { title: "Electricians, plumbers & carpenters", description: "Furniture installation, plumbing repairs, wiring or rewiring" },
        { title: "Cleaners", description: "House cleaning, kitchen cleaning, bathroom cleaning" },
        { title: "Female beauticians", description: "Facials, waxing, haircuts, massage for women" },
        { title: "Male stylists & barbers", description: "Facials, haircuts, massage for men, beard trimming" },
    ];

    const steps = [
        { title: "Use the app", description: "Tell us when and where you want to work" },
        { title: "Delight your customers", description: "Work your magic in a 1:1 setting with your clients" },
        { title: "Get paid weekly", description: "We ensure your peace of mind with automated weekly payouts" },
    ];

    return (
        <div className="min-h-screen font-sans bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white pt-16 pb-12 px-4 shadow-sm relative overflow-hidden">
                <div className="container mx-auto text-center max-w-4xl relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Earn up to <span className="text-hommlie">3 times</span> your current income
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                    >
                        Join a thriving community of over 50,000 service professionals and transform your life
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={scrollToForm}
                        className="bg-hommlie text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-hommlie/90 transition-all shadow-sm"
                    >
                        Join Us Today
                    </motion.button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white border-b border-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { number: "50,000+", label: "Professionals worldwide" },
                            { number: "1500 Cr+", label: "Paid to partners in 2022" },
                            { number: "12 Lakh+", label: "Services delivered globally" },
                        ].map((item, index) => (
                            <div key={index} className="px-4 py-2">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{item.number}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 space-y-16 max-w-6xl">

                {/* Categories */}
                <section>
                    <div className="text-center mb-10">
                        <span className="text-hommlie font-semibold uppercase tracking-wider text-xs mb-2 block">Opportunities</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Join us in these categories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-hommlie/30 hover:shadow-lg transition-all duration-300 group">
                                <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-hommlie transition-colors">{category.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{category.description}</p>
                                <button onClick={scrollToForm} className="text-sm font-semibold text-hommlie flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Apply Now <FaArrowRight size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section>
                    <div className="text-center mb-10">
                        <span className="text-hommlie font-semibold uppercase tracking-wider text-xs mb-2 block">Process</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How Hommlie Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-hommlie/10 rounded-full flex items-center justify-center mx-auto mb-4 text-hommlie font-bold text-xl">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-gray-800">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form & CTA Combined */}
                <section id='form' ref={formRef} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
                    <div className="p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-700">
                                <FaCheckCircle className="text-hommlie mr-3 flex-shrink-0" /> Guaranteed weekly payouts
                            </li>
                            <li className="flex items-center text-gray-700">
                                <FaCheckCircle className="text-hommlie mr-3 flex-shrink-0" /> Be your own boss
                            </li>
                            <li className="flex items-center text-gray-700">
                                <FaCheckCircle className="text-hommlie mr-3 flex-shrink-0" /> Extensive training & support
                            </li>
                            <li className="flex items-center text-gray-700">
                                <FaCheckCircle className="text-hommlie mr-3 flex-shrink-0" /> Join 50,000+ happy partners
                            </li>
                        </ul>
                        <div className="mt-auto pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 italic leading-relaxed">
                                "Hommlie has transformed the way I work. The consistent income and flexibility are unmatched."
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Get Started Today</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-hommlie focus:border-hommlie block p-3 transition-colors outline-none"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    minLength={10}
                                    maxLength={10}
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-hommlie focus:border-hommlie block p-3 transition-colors outline-none"
                                    placeholder="Enter 10-digit mobile number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Message (Optional)</label>
                                <textarea
                                    id="message"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-hommlie focus:border-hommlie block p-3 transition-colors outline-none"
                                    placeholder="Tell us about yourself"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-hommlie hover:bg-hommlie/90 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Bottom CTA Banner */}
            <section className="bg-hommlie py-16 px-4 text-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Ready to transform your career?</h2>
                    <p className="text-white/80 mb-8 text-lg">Join thousands of service professionals who trust Hommlie for their livelihood.</p>
                    <button
                        onClick={scrollToForm}
                        className="bg-white text-hommlie px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
                    >
                        Join 50,000+ other partners
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PartnerWithUs;