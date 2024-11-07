import React, { useState, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';

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

    return (
        <div className="min-h-screen font-sans bg-white">
        <main className="container mx-auto px-4 py-16">
            <section className="mb-24 text-center space-y-12">
            <h1 className="text-5xl font-extrabold mb-6 text-gray-800">
                Earn up to <span style={{color: "#249370"}}>3 times</span> your current income
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join a thriving community of over 50,000 service professionals and transform your life
            </p>
            <button onClick={scrollToForm} style={{backgroundColor: "#249370"}} className="text-white px-10 py-2 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-xl transform hover:scale-105">
                Join Us Today
            </button>
            </section>

            <section className="mb-24 flex flex-wrap gap-10 justify-center mt-10 px-5 text-center text-black capitalize">
            {[
                { number: "50,000+", label: "Professionals worldwide" },
                { number: "1500 Cr+", label: "Paid to partners in 2022" },
                { number: "12 Lakh+", label: "Services delivered last month globally" },
            ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                <div className="text-3xl font-black">{item.number}</div>
                <div className="text-lg">{item.label}</div>
                </div>
            ))}
            </section>

            <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Join us in these categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                { title: "AC & appliance technicians", description: "Installation, repairs, maintenance, servicing, cleaning" },
                { title: "Electricians, plumbers & carpenters", description: "Furniture installation, plumbing repairs, wiring or rewiring" },
                { title: "Cleaners", description: "House cleaning, kitchen cleaning, bathroom cleaning" },
                { title: "Female beauticians", description: "Facials, waxing, haircuts, massage for women" },
                { title: "Male stylists & barbers", description: "Facials, haircuts, massage for men, beard trimming" },
                ].map((category, index) => (
                <div key={index} className="bg-white px-4 py-8 rounded shadow hover:shadow-xl transition-shadow duration-300 glow-border">
                    <h3 className="text-2xl font-semibold mb-4 text-green-700">{category.title}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <button onClick={scrollToForm} className="flex flex-row items-center gap-2 font-semibold hover:text-purple-700 transition-colors duration-300" style={{color: "#249370"}}>
                    Apply Now <FaArrowRight size={14} />
                    </button>
                </div>
                ))}
            </div>
            </section>

            <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">How Hommlie Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                { title: "Use the app", description: "Tell us when and where you want to work" },
                { title: "Delight your customers", description: "Work your magic in a 1:1 setting with your clients" },
                { title: "Get paid weekly", description: "We ensure your peace of mind with automated weekly payouts" },
                ].map((step, index) => (
                <div key={index} className="text-center bg-white p-8 rounded shadow hover:shadow-xl transition-shadow duration-300 glow-border">
                    <h3 className="text-2xl font-semibold mb-4 text-green-700">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                </div>
                ))}
            </div>
            </section>

            <section className="mb-24">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Join Hommlie in 3 easy steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                    {
                        number: 1,
                        title: "Apply online",
                        description: "Book an interview slot with your team in a few simple steps."
                    },
                    {
                        number: 2,
                        title: "Meet our trainer",
                        description: "Keep your identity documents and a police check. We can help you get one as well."
                    },
                    {
                        number: 3,
                        title: "Practical training",
                        description: "Successful candidates will be invited to our office so that they can complete the process."
                    },
                    {
                        icon: "check",
                        title: "Go live & start earning",
                        description: "It's showtime! You start receiving leads as soon as you create your profile on our partner app."
                    }
                    ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 bg-[#249370] text-white`}>
                        {step.icon ? '✓' : step.number}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                        {index < 3 && (
                        <div className="hidden md:block w-full h-0.5 bg-green-400 mt-8"></div>
                        )}
                    </div>
                    ))}
                </div>
            </section>

            <section id='form' ref={formRef} className="flex flex-col items-center px-5 w-full max-w-4xl mx-auto max-md:py-16">
                <h2 className="text-4xl font-black tracking-tighter text-black capitalize bg-clip-text bg-white mb-8">
                Why work with us?
                </h2>
                <div className="text-lg text-black capitalize mb-12 text-center">
                Join 50,000+ other partners
                </div>
                
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 glow-border">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
                        <input 
                            type="tel" 
                            id="mobile" 
                            minLength={10}
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleChange}
                            className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                        <textarea 
                            id="message" 
                            rows="4" 
                            value={formData.message}
                            onChange={handleChange}
                            className="shadow appearance-none shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit" 
                            style={{backgroundColor: "#249370"}} 
                            className="text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </section>

            <section className="text-center text-white py-16 shadow-2xl mt-4" style={{backgroundColor: "#249370"}}>
                <h2 className="text-4xl font-bold mb-8">Ready to transform your career?</h2>
                <button onClick={scrollToForm} style={{color: "#249370"}} className="bg-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl transform hover:scale-105">
                    Join 50,000+ other partners
                </button>
            </section>
        </main>
        </div>
    );
};

export default PartnerWithUs;