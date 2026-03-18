import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import { BsArrowLeft, BsCheckCircleFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import config from '../../config/config';

// ─── Static Data ───────────────────────────────────────────────────────────────
const SERVICES = [
    { label: '🪳 Cockroach Control', name: 'Cockroach Control', slug: 'cockroach-control-services-in-bangalore' },
    { label: '🛡️ Gen. Pest Control', name: 'General Pest Control', slug: 'general-pest-control' },
    { label: '🐜 Termite Control', name: 'Termite Control', slug: 'termite-control-services-in-bangalore' },
    { label: '🐛 Bedbugs Control', name: 'Bedbugs Control', slug: 'bed-bug-control-services-in-bangalore' },
    { label: '🦟 Mosquito Control', name: 'Mosquito Control', slug: 'mosquito-control-in-bangalore' },
    { label: '🐁 Rodent Control', name: 'Rodent Control', slug: 'rodent-control-in-bangalore' },
    { label: '🦎 Lizard Control', name: 'Lizard Control', slug: 'lizard-control' },
    { label: '🪰 Flies Control', name: 'Flies Control', slug: 'flies-control' },
    { label: '🪵 Wood Borer', name: 'Wood Borer', slug: 'wood-borer-treatment' },
    { label: '🌿 Weed Control', name: 'Weed Control', slug: 'weed-control' },
    { label: '🧼 Sanitization', name: 'Sanitization', slug: 'sanitization-services' },
    { label: '🏢 Commercial Pest', name: 'Commercial Pest Control', slug: 'commercial-pest-control' },
];

const PEST_EMOJIS = {
    'Cockroach Control': '🪳',
    'Bedbugs Control': '🐛',
    'Termite Control': '🐜',
    'Rodent Control': '🐁',
    'Mosquito Control': '🦟',
    'General Pest Control': '🛡️',
    'Lizard Control': '🦎',
    'Flies Control': '🪰',
    'Sanitization': '🧼',
    'Wood Borer': '🪵',
    'Weed Control': '🌿',
    'Commercial Pest Control': '🏢',
};

const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Office'];

const TIP_OPTIONS = [
    { label: '₹30', value: 30 },
    { label: '₹50', value: 50 },
    { label: '₹100', value: 100 },
    { label: 'No Tip', value: 0 },
];

const COMPLAINT_TYPES = [
    '😞 Poor Service Quality',
    '🤝 Technician Behaviour',
    '⏰ Delay in Service',
    '💳 Billing Issue',
    '📋 Other',
];

const PRICES = {
    'Home Cleaning': { '1 BHK': '₹399', '2 BHK': '₹599', '3 BHK': '₹799', '4+ BHK': '₹999', 'Villa': '₹1,499', 'Office': '₹1,299' },
    'Plumbing': { '1 BHK': '₹299', '2 BHK': '₹349', '3 BHK': '₹399', '4+ BHK': '₹499', 'Villa': '₹599', 'Office': '₹549' },
    'Electrical': { '1 BHK': '₹349', '2 BHK': '₹399', '3 BHK': '₹449', '4+ BHK': '₹549', 'Villa': '₹649', 'Office': '₹599' },
    'Painting': { '1 BHK': '₹1,999', '2 BHK': '₹2,999', '3 BHK': '₹3,999', '4+ BHK': '₹5,999', 'Villa': '₹9,999', 'Office': '₹7,999' },
    'Carpentry': { '1 BHK': '₹399', '2 BHK': '₹449', '3 BHK': '₹499', '4+ BHK': '₹599', 'Villa': '₹699', 'Office': '₹649' },
    'AC Service': { '1 BHK': '₹499', '2 BHK': '₹699', '3 BHK': '₹899', '4+ BHK': '₹1,099', 'Villa': '₹1,299', 'Office': '₹1,199' },
};



const FAQS = [
    { q: 'How do I book a service?', a: 'Click "📅 Book Service" and follow the steps to pick your service, property type, date and time slot.' },
    { q: 'What are your service areas?', a: 'We currently serve Bangalore, Mumbai, Delhi, Chennai and Hyderabad. More cities coming soon!' },
    { q: 'How is pricing calculated?', a: 'Pricing depends on service type and property size. Use "💰 Check Price" to see exact prices.' },
    { q: 'Can I reschedule my booking?', a: 'Yes! Go to "📦 Track Booking", find your booking and use the reschedule option up to 4 hours before the service.' },
    { q: 'Is there a cancellation fee?', a: 'Cancellations more than 4 hours before service are free. Late cancellations may attract a small fee.' },
    { q: 'Are professionals verified?', a: 'Yes! All professionals undergo thorough background checks and training.' },
];

const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        
        return {
            label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
            value: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            formattedDate
        };
    });
};

const getDynamicTimeSlots = (formattedDate) => {
    const slots = [
        "09:00 AM - 11:00 AM",
        "11:00 AM - 01:00 PM",
        "01:00 PM - 03:00 PM",
        "03:00 PM - 05:00 PM",
        "05:00 PM - 07:00 PM",
        "07:00 PM - 09:00 PM"
    ];

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (formattedDate === todayStr) {
        const currentHour = today.getHours();
        const availableFrom = currentHour + 2;

        return slots.filter(slot => {
            const startTimePart = slot.split(" - ")[0];
            let startHour = parseInt(startTimePart.split(":")[0]);
            const isPM = startTimePart.includes("PM") && startHour !== 12;
            const is12AM = startTimePart.includes("AM") && startHour === 12;
            const normalizedStart = isPM ? startHour + 12 : (is12AM ? 0 : startHour);
            return normalizedStart >= availableFrom;
        });
    }
    return slots;
};

// ─── Sub-components ────────────────────────────────────────────────────────────
const OptionList = ({ options }) => (
    <div className="space-y-2 mt-3">
        {options.map((opt, i) => (
            <motion.button key={`${opt.label}-${i}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={opt.onClick}
                className="w-full text-left px-4 py-3 bg-white border border-blue-100 rounded-xl text-sm text-gray-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                {opt.label}
            </motion.button>
        ))}
    </div>
);

const ChipGrid = ({ chips, cols3 = false }) => (
    <div className={`grid gap-2 mt-3 ${cols3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {chips.map((chip) => (
            <motion.button key={chip.label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={chip.onClick}
                className="px-3 py-2 bg-white border border-blue-100 rounded-xl text-xs text-gray-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm text-center">
                {chip.label}
            </motion.button>
        ))}
    </div>
);

const PriceCard = ({ service, property, price, onBook, onExpert }) => (
    <div className="mt-3 space-y-2">
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-2">
            <div className="flex justify-between"><span className="text-xs text-gray-500">Service</span><span className="text-sm font-semibold text-gray-800">{service}</span></div>
            <div className="flex justify-between"><span className="text-xs text-gray-500">Property</span><span className="text-sm font-semibold text-gray-800">{property}</span></div>
            <div className="flex justify-between border-t pt-2 mt-1"><span className="text-xs text-gray-500">Est. Price</span><span className="text-lg font-bold text-[#0463ac]">{price}</span></div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onBook}
            className="w-full py-3 bg-[#0463ac] text-white rounded-xl font-semibold text-sm hover:bg-[#0352a0] transition-colors">
            ✅ Book Now
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onExpert}
            className="w-full py-3 bg-white border border-blue-200 text-[#0463ac] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
            💬 Talk to Expert
        </motion.button>
    </div>
);

const MobileInput = ({ value, onChange, onSubmit, label = '📨 Send OTP' }) => (
    <div className="mt-3 space-y-2">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <span className="px-3 text-sm text-gray-500 bg-gray-50 border-r border-gray-200 py-3">+91</span>
            <input type="tel" maxLength={10} value={value} onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter mobile number" className="flex-1 px-3 py-3 text-sm text-gray-700 outline-none" />
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSubmit} disabled={value.length !== 10}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${value.length === 10 ? 'bg-[#0463ac] text-white hover:bg-[#0352a0]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {label}
        </motion.button>
    </div>
);

const NameInput = ({ value, onChange, onSubmit, placeholder = "Enter your full name" }) => (
    <div className="mt-3 space-y-2">
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none shadow-sm focus:border-blue-300" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSubmit} disabled={value.trim().length < 3}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${value.trim().length >= 3 ? 'bg-[#0463ac] text-white hover:bg-[#0352a0]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Continue →
        </motion.button>
    </div>
);

const OtpInput = ({ value, onChange, onSubmit }) => (
    <div className="mt-3 space-y-2">
        <input type="tel" maxLength={4} value={value} onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Enter 4-digit OTP"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-center text-xl tracking-[1em] font-bold text-gray-800 outline-none shadow-sm focus:border-blue-300" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSubmit} disabled={value.length !== 4}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${value.length === 4 ? 'bg-[#0463ac] text-white hover:bg-[#0352a0]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            ✅ Verify OTP
        </motion.button>
        <button className="w-full text-center text-xs text-[#0463ac] py-1">Resend OTP</button>
    </div>
);

const ExpertForm = ({ name, mobile, onNameChange, onMobileChange, onSubmit, isLoading }) => (
    <div className="mt-3 space-y-3 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Full Name</label>
            <input 
                type="text" 
                value={name} 
                onChange={e => onNameChange(e.target.value)}
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-300 transition-all font-medium" 
            />
        </div>
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Mobile Number</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-300 transition-all">
                <span className="px-3 text-sm text-gray-500 border-r border-gray-200 py-3">+91</span>
                <input 
                    type="tel" 
                    maxLength={10} 
                    value={mobile} 
                    onChange={e => onMobileChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number" 
                    className="flex-1 px-3 py-3 text-sm text-gray-700 bg-transparent outline-none" 
                />
            </div>
        </div>
        <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={onSubmit}
            disabled={isLoading || (name.trim().length < 3) || (mobile.length !== 10)}
            className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 
                ${(name.trim().length >= 3 && mobile.length === 10) 
                    ? 'bg-[#0463ac] text-white hover:bg-[#0352a0]' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '📞 Request Callback'}
        </motion.button>
    </div>
);

const SuccessCard = ({ title, subtitle, color = 'green', onReset }) => (
    <div className="mt-3 space-y-3">
        <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 text-center`}>
            <BsCheckCircleFill className={`text-${color}-500 text-3xl mx-auto mb-2`} />
            <h4 className={`font-bold text-${color}-700`}>{title}</h4>
            {subtitle && <p className={`text-xs text-${color}-600 mt-1`}>{subtitle}</p>}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onReset}
            className="w-full py-3 bg-white border border-blue-200 text-[#0463ac] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
            🏠 Back to Main Menu
        </motion.button>
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const AiChatDrawer = ({ isOpen, onClose }) => {
    const INIT_MSGS = [{ type: 'bot', text: 'Hello! 👋 Welcome to Hommlie AI Support. How can I help you today?' }];

    const { 
        categoryData, user, addresses, getAddresses, token, 
        paymentList, getPaymentList, bookings, getBookings, getCart,
        setToken, setUser, getUser
    } = useCont();
    const [messages, setMessages] = useState(INIT_MSGS);
    const [step, setStep] = useState('welcome');
    const [snapshots, setSnapshots] = useState([]);
    const [flowData, setFlowData] = useState({});
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [dynamicServices, setDynamicServices] = useState(SERVICES);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [otpVal, setOtpVal] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [counter, setCounter] = useState(60);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmittedExpert, setHasSubmittedExpert] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchAllPestServices = async () => {
            let catsFromApi = [];
            try {
                // Fetch same data source as homepage for exact mirroring
                const res = await axios.get(`${config.API_URL}/api/homepage`);
                if (res.data.status === 1) {
                    catsFromApi = res.data.data.all_categories || [];
                }
            } catch (err) {
                console.warn("AI Chat: Failed to fetch homepage data, using context fallback", err);
                if (categoryData) catsFromApi = categoryData.data || categoryData || [];
            }

            if (catsFromApi.length > 0) {
                let allSubcats = [];
                catsFromApi.forEach(cat => {
                    const subcats = cat.Subcategories || cat.subcategories || cat.Subcategory || cat.subcategory || [];
                    const catName = (cat.category_name || '').toLowerCase();
                    
                    subcats.forEach(sub => {
                        const subName = (sub.subcategory_name || '').toLowerCase();
                        // Mirror the broad logic: anything pest-related
                        if (catName.includes('pest') || subName.includes('pest')) {
                            allSubcats.push(sub);
                        }
                    });
                });

                if (allSubcats.length > 0) {
                    const uniqueSubcats = allSubcats.filter((s, index, self) =>
                        index === self.findIndex((t) => (t.id === s.id && t.id) || t.slug === s.slug)
                    );

                    const mapped = uniqueSubcats.map(sub => ({
                        label: `${PEST_EMOJIS[sub.subcategory_name] || '🛡️'} ${sub.subcategory_name}`,
                        name: sub.subcategory_name,
                        slug: sub.slug
                    }));
                    mapped.sort((a, b) => a.name.localeCompare(b.name));
                    setDynamicServices(mapped);
                }
            }
        };
        fetchAllPestServices();
    }, [categoryData]);

    const fetchProductDetails = async (slug, nextStep, userMsg, botMsgBase, data = {}) => {
        setIsLoadingProduct(true);
        let products = [];
        
        try {
            // 1. Try to fetch product details for the subcategory slug
            const res = await axios.post(`${config.API_URL}/api/cleaningsubcategory`, { slug });
            if (res.data.status === 1) {
                products = res.data.data.products || [];
            }
        } catch (err) {
            console.warn("AI Chat: Error fetching products for slug:", slug, err);
        }

        if (products.length === 0) {
            try {
                // Fallback attempt
                const resProd = await axios.post(`${config.API_URL}/api/productdetails`, { slug });
                if (resProd.data.status === 1) {
                    products = Array.isArray(resProd.data.data) ? resProd.data.data : [resProd.data.data];
                }
            } catch (err) {
                console.error("AI Chat: Fallback fetch failed:", err);
            }
        }

        try {
            if (products.length > 0) {
                setCurrentProducts(products);
                
                // Extract unique BHKs/Variations
                const productBhks = [];
                products.forEach(product => {
                    const vars = product.variations || (product.attributes && product.attributes[0]?.variations) || [];
                    vars.forEach(v => {
                        const vName = v.variation || v.data?.variation;
                        if (vName && !productBhks.includes(vName)) productBhks.push(vName);
                    });
                });
                
                // Smart sort for BHKs
                productBhks.sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));
                
                if (productBhks.length > 0) {
                    go(nextStep, userMsg, botMsgBase, { ...data, productSlug: slug, availableBhks: productBhks });
                } else {
                    go('welcome', userMsg, "Sorry, we don't have standard pricing for this service type yet. Please try another or contact our expert.");
                }
            } else {
                go('welcome', userMsg, "Sorry, I couldn't find details for that service. Please try another one.");
            }
        } catch (err) {
            console.error("AI Chat: Process error in fetchProductDetails:", err);
            go('welcome', userMsg, "Technical error. Please try again later.");
        } finally {
            setIsLoadingProduct(false);
        }
    };

    useEffect(() => {
        if (isOpen && token) {
            getAddresses();
            getPaymentList();
        }
    }, [isOpen, token]);

    useEffect(() => {
        let timer;
        if (isOtpSent && counter > 0) {
            timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
        } else if (counter === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isOtpSent, counter]);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, step]);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => { reset(); }, 400);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const reset = () => {
        setMessages(INIT_MSGS); setStep('welcome'); setSnapshots([]);
        setFlowData({}); setInputVal(''); setOtpVal(''); setExpandedFaq(null);
    };

    const go = (nextStep, userMsg = null, botMsg = null, data = {}, resetExpert = true) => {
        setSnapshots(prev => [...prev, { step, messages: [...messages], flowData: { ...flowData }, currentProduct, currentProducts, counter, isOtpSent }]);
        setMessages(prev => [
            ...prev,
            ...(userMsg ? [{ type: 'user', text: userMsg }] : []),
            ...(botMsg ? [{ type: 'bot', text: botMsg }] : []),
        ]);
        setFlowData(prev => ({ ...prev, ...data }));
        setStep(nextStep); setInputVal(''); setOtpVal('');
        if (resetExpert) setHasSubmittedExpert(false);
    };

    const handleSendOtpAuth = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}/api/register`, {
                mobile: `+91${inputVal}`,
            });
            if (response.data.status === 1) {
                const next = step === 'track_mobile' ? 'track_otp' : 'book_otp';
                setIsOtpSent(true);
                setCounter(60);
                go(next, `📱 +91 ${inputVal}`, `OTP sent to +91 ${inputVal}. Please enter it below.`, { 
                    ...flowData,
                    mobile: inputVal, 
                    isOldUser: !!response.data?.user_name, 
                    userName: response.data?.user_name || "" 
                });
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: response.data.message || "Failed to send OTP. Try again." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Network error while sending OTP." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtpAuth = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}/api/resendotp`, {
                mobile: `+91${flowData.mobile}`,
            });
            if (response.data.status === 1) {
                setCounter(60);
                setIsOtpSent(true);
                setMessages(prev => [...prev, { type: 'bot', text: "OTP resent successfully! 📩" }]);
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: response.data.message || "Could not resend OTP." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Error resending OTP." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtpAuth = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}/api/verifyotp`, {
                mobile: `+91${flowData.mobile}`,
                otp: Number(otpVal),
                name: flowData.userName || "Guest User",
                referral_code: "",
            });

            if (response.data.status === 1) {
                const jwtToken = response.data.token;
                Cookies.set("HommlieUserjwtToken", jwtToken, { expires: 30, path: "/", secure: true, sameSite: "strict" });
                
                setToken(jwtToken);
                const decoded = jwtDecode(jwtToken);
                setUser(decoded);
                localStorage.setItem("HommlieUser", JSON.stringify(decoded));
                
                // Refresh global data
                getUser();
                getCart();
                getBookings();
                await getAddresses();
                await getPaymentList();

                let nextStep;
                let botMsg;
                if (flowData.nextStepAfterLogin) {
                    nextStep = flowData.nextStepAfterLogin;
                    botMsg = '✅ OTP verified! You can now continue.';
                } else if (step === 'track_otp') {
                    nextStep = 'track_bookings';
                    botMsg = '✅ OTP verified! Here are your recent bookings:';
                } else {
                    nextStep = (addresses && addresses.length > 0) ? 'book_address_select' : 'book_address';
                    botMsg = '✅ OTP verified! Welcome back. Please continue with your booking.';
                }
                go(nextStep, `🔐 ${otpVal}`, botMsg);
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: response.data.message || "Invalid OTP. Please try again." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Verification failed. Check your network." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExpertRequest = async () => {
        setIsLoading(true);
        
        // Ensure we only send the 10-digit number
        const rawMobile = inputVal || flowData.mobile;
        const mobileToUse = String(rawMobile).replace(/\D/g, '').slice(-10);
        
        try {
            const { expertName, serviceName, service } = flowData;
            
            // Clean strings of non-ASCII characters that might break the backend
            const cleanName = String(expertName || user?.name || "Customer").replace(/[^\x00-\x7F]/g, "").trim();
            const cleanService = String(serviceName || service || "General").replace(/[^\x00-\x7F]/g, "").trim();
            
            // payload exact match with HomeForm logic
            const payload = {
                fullName: cleanName,
                address: "Pincode: N/A",
                mobile: mobileToUse,
                email: "",
                date: new Date().toISOString(),
                time: "N/A",
                service: "AI Chat Lead",
            };

            const response = await axios.post(`${config.API_URL}/api/createInspection`, payload);
            
            if (response.data.status === 1 || response.data.status === true || response.status === 200) {
                go('talk_expert_done', null, `Our expert will call ${cleanName} at +91 ${mobileToUse} shortly!`, { mobile: mobileToUse });
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: response.data?.message || "Failed to submit request." }]);
            }
        } catch (err) {
            console.error("Expert request error:", err);
            setMessages(prev => [...prev, { type: 'bot', text: "Technical error. Please try again or call support." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-trigger expert request for logged-in users
    useEffect(() => {
        if (step === 'talk_expert_submit' && !isLoading && !hasSubmittedExpert) {
            handleExpertRequest();
        }
    }, [step, isLoading, hasSubmittedExpert]);

    const handlePlaceOrder = async (razorpayId = null) => {
        setIsLoading(true);
        const jwtToken = token || Cookies.get("HommlieUserjwtToken");
        if (!jwtToken) {
            setMessages(prev => [...prev, { type: 'bot', text: "Please login again to continue." }]);
            setIsLoading(false);
            return;
        }

        const u = jwtDecode(jwtToken);
        const { selectedVariation, address, formattedDate, timeSlot, paymentType, tipAmount, selectedAddress } = flowData;
        
        // Parse price and totals robustly
        const basePrice = Number(String(flowData.price || "0").replace(/[₹, \-]/g, '')) || 0;
        const total = basePrice + (Number(tipAmount) || 0);

        try {
            // 1. Add to cart first (Server requires items in Cart table to associate with Order)
            const addToCartPayload = {
                user_id: Number(u.id),
                product_id: Number(currentProduct?.id),
                vendor_id: Number(currentProduct?.vendor_id),
                product_name: currentProduct?.product_name || flowData.service,
                image: (currentProduct?.productimages?.[0]?.image_url || currentProduct?.image_url || ""),
                qty: 1,
                price: basePrice,
                attribute: selectedVariation?.attribute_id,
                variation: selectedVariation?.id,
                tax: Number(selectedVariation?.tax || currentProduct?.tax || 0),
                shipping_cost: Number(currentProduct?.shipping_cost || 0),
                wallet_amount: Number(selectedVariation?.wallet_amount || currentProduct?.wallet_amount || 0),
            };

            const cartRes = await axios.post(`${config.API_URL}/api/addtocart`, addToCartPayload, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });

            if (cartRes.data.status !== 1 && !cartRes.data.message?.toLowerCase().includes("already in cart")) {
                setMessages(prev => [...prev, { type: 'bot', text: cartRes.data.message || "Could not prepare your cart." }]);
                setIsLoading(false);
                return;
            }

            // 2. Refresh cart context to sync state
            await getCart();

            // 3. Prepare clean address and time for Order
            const addr = selectedAddress || {};
            const cleanTime = (timeSlot || "").includes(" - ") ? timeSlot.split(" - ")[0] : timeSlot;
            
            const payload = {
                user_id: Number(u.id),
                payment_type: Number(paymentType?.id),
                payment_id: razorpayId || Math.random().toString(36).substring(2, 12),
                grand_total: total,
                discount_amount: 0, 
                coupon_name: null,
                coupon_id: null,
                order_notes: "Booked via AI Chat",
                full_name: String(addr.name || user?.name || u.name || "Customer").trim(),
                email: String(addr.email || user?.email || u.email || "").trim(),
                mobile: String(addr.mobile || user?.mobile || u.mobile || "").trim(),
                landmark: String(addr.landmark || "").trim(),
                street_address: String(addr.house_no && addr.area ? `${addr.house_no}, ${addr.area}` : (addr.address || address || "")).trim(),
                pincode: String(addr.pincode || "560001").trim(),
                latitude: String(addr.latitude || "0").trim(),
                longitude: String(addr.longitude || "0").trim(),
                desired_date: formattedDate,
                desired_time: cleanTime,
                wallet_used: 0,
                tip_amount: Number(tipAmount) || 0,
                wallet_amount: Number(selectedVariation?.wallet_amount || currentProduct?.wallet_amount || 0),
            };

            const res = await axios.post(`${config.API_URL}/api/order`, payload, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });

            if (res.data.status === 1) {
                await getCart();
                await getBookings();
                go('track_status', null, `🎉 Order placed successfully! Here are your booking details:`, { 
                    selectedBooking: { 
                        order_number: res.data.order_number, 
                        service: currentProduct?.product_name || service, 
                        desired_date: formattedDate, 
                        desired_time: timeSlot, 
                        grand_total: total,
                        order_status: 1 
                    } 
                });
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: res.data.message || "Failed to place order." }]);
            }
        } catch (err) {
            console.error("Order error:", err);
            setMessages(prev => [...prev, { type: 'bot', text: "Technical error placing order." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAiChatComplaintSubmit = async () => {
        if (isLoading) return;
        const msg = inputVal.trim();
        if (msg.length < 10) return;

        setIsLoading(true);
        try {
            const jwtToken = token || Cookies.get("HommlieUserjwtToken");
            const headers = { 
                "Content-Type": "application/json", 
                Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined 
            };
            
            const res = await axios.post(`${config.API_URL}/api/raisecomplaint`, { 
                orderId: flowData.selectedBooking?.id, 
                complaintText: msg 
            }, { headers });

            if (res.data && res.data.message) {
                const cid = 'CMP-' + Date.now().toString().slice(-6);
                go('complaint_done', msg, `✅ Complaint registered!\nComplaint ID: ${cid}\nWe'll reach you within 24 hours.`, { complaintDesc: msg, complaintId: cid });
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: res.data.error || "Failed to submit complaint. Please try again." }]);
            }
        } catch (error) {
            console.error("Complaint error:", error);
            setMessages(prev => [...prev, { type: 'bot', text: "Technical error. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const initiateRazorpay = async () => {
        setIsLoading(true);
        const jwtToken = token || Cookies.get("HommlieUserjwtToken");
        if (!jwtToken) {
            setMessages(prev => [...prev, { type: 'bot', text: "Session expired. Please login again." }]);
            setIsLoading(false);
            return;
        }

        const u = jwtDecode(jwtToken);
        const basePrice = parseFloat(flowData.price.replace(/[₹,]/g, '')) || 0;
        const total = basePrice + (flowData.tipAmount || 0);

        try {
            const res = await axios.post(`${config.API_URL}/api/initiatePayment`, 
                { amount: total, currency: "INR", user_id: u.id },
                { headers: { Authorization: `Bearer ${jwtToken}` }}
            );

            if (res.data.status === 1) {
                const options = {
                    key: config.RAZORPAY_KEY_ID,
                    amount: res.data.data.amount,
                    currency: res.data.data.currency,
                    name: "Hommlie",
                    description: `Service Booking: ${flowData.service}`,
                    order_id: res.data.data.id,
                    handler: async (response) => {
                        await handlePlaceOrder(response.razorpay_payment_id);
                    },
                    prefill: { name: user?.name || u?.name, contact: user?.mobile || u?.mobile },
                    theme: { color: "#0463ac" },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: res.data.message || "Could not initiate payment." }]);
            }
        } catch (err) {
            console.error("Razorpay error:", err);
            setMessages(prev => [...prev, { type: 'bot', text: "Payment gateway error. Please try COD." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const goBack = () => {
        if (!snapshots.length) return;
        const last = snapshots[snapshots.length - 1];
        setSnapshots(prev => prev.slice(0, -1));
        setStep(last.step); setMessages(last.messages); setFlowData(last.flowData);
        setCurrentProduct(last.currentProduct || null);
        setCurrentProducts(last.currentProducts || []);
        setInputVal(''); setOtpVal(''); setExpandedFaq(null);
    };

    // ─── Step Renderer ──────────────────────────────────────────────────────────
    const renderStep = () => {
        switch (step) {

            /* ═══════ WELCOME ═══════ */
            case 'welcome':
                return <OptionList options={[
                    { label: '📅 Book Service', onClick: () => go('book_service', 'Book a Service', 'Great! Which service would you like to book?') },
                    { label: '💰 Check Price', onClick: () => go('price_service', 'Check Price', 'Sure! Which service would you like to check price for?') },
                    { label: '📦 Track Booking', onClick: () => {
                        if (user && user.mobile) {
                            if (!bookings || bookings.length === 0) {
                                getBookings();
                            }
                            go('track_bookings', 'Track My Booking', 'Here are your recent bookings:');
                        } else {
                            go('track_mobile', 'Track My Booking', 'Please enter your registered mobile number.');
                        }
                    }},
                    { label: '🚨 Raise Complaint', onClick: () => {
                        if (user && user.mobile) {
                            if (!bookings || bookings.length === 0) {
                                getBookings();
                            }
                            go('complaint_select_order', 'Raise a Complaint', 'Please select the booking you have an issue with:');
                        } else {
                            go('track_mobile', 'Raise a Complaint', 'Please login to raise a complaint.', { nextStepAfterLogin: 'complaint_select_order' });
                        }
                    }},
                    { label: '❓ Ask a Question', onClick: () => go('faq', 'Ask a Question', 'Here are some FAQs. Tap any to expand 👇') },
                ]} />;

            /* ═══════ BOOK SERVICE ═══════ */
            case 'book_service':
                return isLoadingProduct ? <div className="text-center py-2"><span className="text-xs text-gray-400 animate-pulse">Fetching details...</span></div> : (
                    <ChipGrid chips={dynamicServices.map(s => ({
                        label: s.label,
                        onClick: () => fetchProductDetails(s.slug, 'book_property', s.label, `For ${s.name}, what is the property size?`, { service: s.name, slug: s.slug })
                    }))} />
                );

            case 'book_property':
                return (
                    <ChipGrid chips={(flowData.availableBhks || []).map(p => ({
                        label: p,
                        onClick: () => {
                            let serviceTypes = [];
                            currentProducts.forEach(product => {
                                if (product.attributes) {
                                    product.attributes.forEach(attr => {
                                        if (attr.variations?.some(v => v.variation === p)) {
                                            if (!serviceTypes.includes(attr.attribute_name)) serviceTypes.push(attr.attribute_name);
                                        }
                                    });
                                } else if (product.variations) {
                                    const hasVar = product.variations.some(v => (v.variation || v.data?.variation) === p);
                                    if (hasVar && !serviceTypes.includes('Standard Service')) serviceTypes.push('Standard Service');
                                }
                            });
                            
                            if (serviceTypes.length > 0) {
                                go('book_service_type', p, `Excellent! Please choose which service variant you want for ${p}:`, { property: p, availableServiceTypes: serviceTypes });
                            } else {
                                go('welcome', p, "Sorry, no variants found for this size.");
                            }
                        },
                    }))} />
                );

            case 'book_service_type':
                return <OptionList options={(flowData.availableServiceTypes || []).map(type => ({
                    label: type,
                    onClick: () => {
                        const p = flowData.property;
                        let productVariants = [];
                        
                        currentProducts.forEach(product => {
                            if (product.attributes) {
                                product.attributes.filter(attr => attr.attribute_name === type).forEach(attr => {
                                    const v = attr.variations?.find(v => v.variation === p);
                                    if (v) {
                                        productVariants.push({
                                            ...v,
                                            parentProduct: product,
                                            label: product.product_name,
                                            full_price: v.discounted_variation_price || v.price
                                        });
                                    }
                                });
                            } else if (type === 'Standard Service' && product.variations) {
                                const v = product.variations.find(v => (v.variation || v.data?.variation) === p);
                                if (v) {
                                    productVariants.push({
                                        ...v,
                                        parentProduct: product,
                                        label: product.product_name,
                                        full_price: v.discounted_variation_price || v.price || v.data?.discounted_variation_price || v.data?.price
                                    });
                                }
                            }
                        });
                        
                        if (productVariants.length > 0) {
                            go('book_variant', type, `Excellent! Please choose which service package you want:`, { serviceType: type, availableVariants: productVariants });
                        } else {
                            go('welcome', type, "Sorry, no service packages available for this configuration.");
                        }
                    }
                }))} />;

            case 'book_variant':
                return <OptionList options={(flowData.availableVariants || []).map(v => ({
                    label: `${v.label} - ₹${v.full_price}`,
                    onClick: () => {
                        const price = `₹${v.full_price}`;
                        setCurrentProduct(v.parentProduct);
                        go('book_price_show', v.label, `Great choice! Here are your plan details:`, { 
                            variant: `${v.label} (${flowData.serviceType})`, 
                            price, 
                            selectedVariation: v 
                        });
                    }
                }))} />;

            case 'book_price_show':
                return (
                    <div className="space-y-2">
                        <PriceCard
                            service={flowData.service} property={`${flowData.property} (${flowData.variant || ''})`} price={flowData.price}
                            onBook={() => {
                                if (user && user.mobile) {
                                    if (addresses && addresses.length > 0) {
                                        go('book_address_select', '✅ Book Now', 'Great! Which address should we use?', { mobile: user.mobile });
                                    } else {
                                        go('book_address', '✅ Book Now', 'Great! Please enter your service address.', { mobile: user.mobile });
                                    }
                                } else {
                                    go('book_mobile', '✅ Book Now', 'Please enter your mobile number to continue.');
                                }
                            }}
                            onExpert={() => go('talk_expert_form', '💬 Talk to Expert', 'Our expert will call you shortly. Please share your details below.', { expertName: user?.name || '', mobile: (user?.mobile || '').replace(/\D/g, '').slice(-10) })}
                        />
                    </div>
                );

            /* ═══════ MOBILE / OTP ═══════ */
            /* ═══════ EXPERT FLOW ═══════ */
            case 'talk_expert_form':
                return (
                    <ExpertForm 
                        name={flowData.expertName || ''} 
                        mobile={flowData.mobile || ''}
                        onNameChange={val => setFlowData(prev => ({ ...prev, expertName: val }))}
                        onMobileChange={val => setFlowData(prev => ({ ...prev, mobile: val }))}
                        isLoading={isLoading}
                        onSubmit={handleExpertRequest}
                    />
                );

            case 'talk_expert_submit':
                return (
                    <div className="text-center py-4 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-3 border-blue-50 border-t-[#0463ac] rounded-full animate-spin" />
                        <span className="text-xs text-gray-400 font-medium">Processing request...</span>
                    </div>
                );

            case 'book_mobile':
            case 'track_mobile':
            case 'talk_expert':
                return isLoading ? <div className="text-center py-2 animate-pulse text-xs text-blue-500">Processing...</div> : (
                    <MobileInput value={inputVal} onChange={setInputVal}
                        label={'📨 Send OTP'}
                        onSubmit={() => {
                            handleSendOtpAuth();
                        }}
                    />
                );

            case 'book_otp':
            case 'track_otp':
                return (
                    <div className="space-y-3">
                        <OtpInput value={otpVal} onChange={setOtpVal}
                            onSubmit={() => {
                                if (step === 'book_otp') {
                                    handleVerifyOtpAuth();
                                } else {
                                    // Track OTP logic could also be updated but typically tracks use the same verify
                                    handleVerifyOtpAuth();
                                }
                            }} />
                        <div className="flex justify-between items-center px-2">
                            <button
                                onClick={handleResendOtpAuth}
                                disabled={counter > 0 || isLoading}
                                className={`text-xs font-bold ${counter > 0 ? 'text-gray-400' : 'text-[#0463ac] hover:underline'}`}
                            >
                                Resend OTP
                            </button>
                            {counter > 0 && (
                                <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                                    Resend in {counter}s
                                </span>
                            )}
                        </div>
                    </div>
                );

            /* ═══════ ADDRESS / DATE / TIME ═══════ */
            case 'book_address_select':
                return (
                    <div className="space-y-2 mt-3">
                        <ChipGrid chips={[
                            ...addresses.map(addr => ({
                                label: `📍 ${addr.name || 'Home'}: ${addr.house_number || ''} ${addr.address || ''}`.replace(/undefined/g, '').trim(),
                                onClick: () => go('book_date', addr.address, 'Select your preferred date 📅', { 
                                    address: `${addr.house_number || ''} ${addr.address || ''}, ${addr.landmark || ''}`.replace(/undefined/g, '').replace(/, ,/g, ',').trim(),
                                    selectedAddress: addr, 
                                    addressId: addr.id
                                })
                            })),
                            {
                                label: '➕ Add New Address',
                                onClick: () => go('book_address', 'Add New Address', 'Please enter your complete address.')
                            }
                        ]} />
                    </div>
                );

            case 'book_address':
                return (
                    <div className="mt-3 space-y-2">
                        <textarea value={inputVal} onChange={e => setInputVal(e.target.value)} rows={3}
                            placeholder="Enter your complete address..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none shadow-sm focus:border-blue-300 resize-none" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            disabled={inputVal.trim().length < 10}
                            onClick={() => go('book_date', inputVal, 'Select your preferred date 📅', { address: inputVal })}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${inputVal.trim().length >= 10 ? 'bg-[#0463ac] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            Continue →
                        </motion.button>
                    </div>
                );

            case 'book_date':
                return <ChipGrid chips={getNext7Days().map(d => ({
                    label: d.label,
                    onClick: () => go('book_time', d.label, `Select a time slot for ${d.value} 🕐`, { date: d.value, formattedDate: d.formattedDate }),
                }))} />;

            case 'book_time': {
                const availableSlots = getDynamicTimeSlots(flowData.formattedDate);
                if (availableSlots.length === 0) {
                    return (
                        <div className="mt-3 p-4 bg-orange-50 border border-orange-100 rounded-xl text-center">
                            <p className="text-xs font-bold text-orange-700">No slots available for today. Please pick another date.</p>
                            <button onClick={goBack} className="mt-2 text-xs text-orange-600 underline">Go Back</button>
                        </div>
                    );
                }
                return <ChipGrid chips={availableSlots.map(t => ({
                    label: t,
                    onClick: () => go('book_tip', t, "Would you like to add a tip for the professional? ❤️", { timeSlot: t }),
                }))} />;
            }

            case 'book_tip':
                return <ChipGrid chips={TIP_OPTIONS.map(opt => ({
                    label: opt.label,
                    onClick: () => go('book_payment', opt.label, "How would you like to pay?", { tipAmount: opt.value }),
                }))} />;

            case 'book_payment':
                return <ChipGrid chips={(paymentList || []).map(p => ({
                    label: p.payment_name,
                    onClick: () => go('book_summary', p.payment_name, "Here's your booking summary. Please review and confirm 📋", { paymentType: p }),
                }))} />;

            /* ═══════ SUMMARY / CONFIRM ═══════ */
            case 'book_summary': {
                const { service, property, variant, price, address, date, timeSlot, paymentType, tipAmount } = flowData;
                const total = parseFloat(price.replace('₹', '')) + (tipAmount || 0);
                return (
                    <div className="mt-3 space-y-2">
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-2">
                            <h4 className="font-bold text-gray-800 text-sm border-b pb-2">📋 Booking Summary</h4>
                            {[
                                ['Service', service],
                                ['Property', property],
                                ['Variant', variant],
                                ['Date', date],
                                ['Time', timeSlot],
                                ['Address', address],
                                ['Tip', `₹${tipAmount}`],
                                ['Payment', paymentType?.payment_name],
                                ['To Pay', `₹${total}`]
                            ].filter(item => item[1]).map(([k, v]) => (
                                <div key={k} className="flex justify-between items-start">
                                    <span className="text-xs text-gray-500 flex-shrink-0">{k}</span>
                                    <span className="text-xs font-semibold text-gray-800 text-right ml-2 max-w-[60%]">{v}</span>
                                </div>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            onClick={() => {
                                if (paymentType?.payment_name === 'Online') {
                                    initiateRazorpay();
                                } else {
                                    handlePlaceOrder();
                                }
                            }}
                            className={`w-full py-3 bg-[#0463ac] text-white rounded-xl font-semibold text-sm hover:bg-[#0352a0] transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}>
                            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '✅ Confirm Booking'}
                        </motion.button>
                    </div>
                );
            }

            case 'book_confirmed':
                return <SuccessCard title="Booking Confirmed!" subtitle={`Booking ID: ${flowData.orderNumber}`} onReset={reset} />;

            case 'talk_expert_done':
                return <SuccessCard title="Request Received!" subtitle={`Expert will call +91 ${flowData.mobile} shortly.`} color="green" onReset={reset} />;

            /* ═══════ CHECK PRICE ═══════ */
            case 'price_service':
                return <ChipGrid chips={dynamicServices.map(s => ({
                    label: s.label,
                    onClick: () => go('price_step_2', s.label, `Checking price for ${s.name}...`, { service: s.name })
                }))} />;

            case 'price_step_2':
                return <ChipGrid chips={[{ label: 'Sample Option', onClick: () => alert('Logic removed') }]} />;

            /* ═══════ TRACK BOOKING ═══════ */
            case 'track_bookings': {
                const displayBookings = bookings && bookings.length > 0 ? bookings.slice(0, 5) : null;
                const statusNames = ['Not Scheduled', 'Scheduled', 'Dispatched', 'On Site', 'Completed', 'Incomplete', 'Cancelled'];
                return (
                    <div className="mt-3 space-y-2">
                        {displayBookings ? displayBookings.map(b => (
                            <motion.button key={b.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                onClick={() => go('track_status', `Booking ${b.order_number}`, `Details for booking ${b.order_number}:`, { selectedBooking: b })}
                                className="w-full text-left bg-white border border-blue-100 rounded-xl p-3 shadow-sm hover:bg-blue-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{b.product_name || b.service || 'Service'}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{b.desired_date} • {b.desired_time}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-blue-600 bg-blue-50`}>{statusNames[b.order_status] || 'Unknown'}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">ID: {b.order_number}</p>
                            </motion.button>
                        )) : (
                            <div className="p-4 bg-white border border-blue-100 rounded-xl text-center shadow-sm">
                                <p className="text-sm font-medium text-gray-600">No recent bookings found.</p>
                                <button onClick={reset} className="mt-2 text-xs text-blue-600 underline">Back to Menu</button>
                            </div>
                        )}
                        {bookings && bookings.length > 5 && (
                            <button onClick={() => window.location.href = '/my-bookings'} className="w-full py-2 text-xs font-semibold text-[#0463ac] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                                View All Bookings
                            </button>
                        )}
                    </div>
                );
            }

            case 'track_status': {
                const b = flowData.selectedBooking;
                if (!b) return null;
                const statusNames = ['Not Scheduled', 'Scheduled', 'Dispatched', 'On Site', 'Completed', 'Incomplete', 'Cancelled'];
                const statusName = statusNames[b.order_status] || 'Unknown';
                return (
                    <div className="mt-3 space-y-2">
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h4 className="font-bold text-gray-800 text-sm">Booking Details</h4>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600`}>{statusName}</span>
                            </div>
                            {[['Booking ID', b.order_number], ['Service', b.product_name || b.service], ['Date', b.desired_date || b.date], ['Time', b.desired_time || b.time], ['Total', b.grand_total ? `₹${b.grand_total}` : '-']].map(([k, v]) => (
                                v && <div key={k} className="flex justify-between">
                                    <span className="text-xs text-gray-500">{k}</span>
                                    <span className="text-xs font-semibold text-gray-800 text-right max-w-[60%]">{v}</span>
                                </div>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={reset}
                            className="w-full py-3 bg-white border border-blue-200 text-[#0463ac] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
                            🏠 Back to Main Menu
                        </motion.button>
                    </div>
                );
            }

            /* ═══════ COMPLAINT ═══════ */
            case 'complaint_select_order': {
                const displayBookings = bookings && bookings.length > 0 ? bookings.slice(0, 5) : null;
                return (
                    <div className="mt-3 space-y-2">
                        {displayBookings ? displayBookings.map(b => (
                            <motion.button key={b.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                onClick={() => go('complaint_describe', `Booking #${b.order_number}`, `Please describe the issue you're facing with booking #${b.order_number}:`, { selectedBooking: b })}
                                className="w-full text-left bg-white border border-blue-100 rounded-xl p-3 shadow-sm hover:bg-blue-50 transition-colors">
                                <p className="text-sm font-semibold text-gray-800">{b.product_name || b.service}</p>
                                <p className="text-xs text-gray-400 mt-1">ID: {b.order_number} • {b.desired_date}</p>
                            </motion.button>
                        )) : (
                            <div className="p-4 bg-white border border-blue-100 rounded-xl text-center shadow-sm">
                                <p className="text-sm font-medium text-gray-600">No recent bookings found to raise a complaint.</p>
                                <button onClick={reset} className="mt-2 text-xs text-blue-600 underline">Back to Menu</button>
                            </div>
                        )}
                        {bookings && bookings.length > 5 && (
                            <button onClick={() => window.location.href = '/my-bookings'} className="w-full py-2 text-xs font-semibold text-[#0463ac] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                                View All Bookings
                            </button>
                        )}
                    </div>
                );
            }

            case 'complaint_describe':
                return (
                    <div className="mt-3 space-y-2">
                        <textarea value={inputVal} onChange={e => setInputVal(e.target.value)} rows={4}
                            placeholder="Describe your issue here..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none shadow-sm focus:border-blue-300 resize-none" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            disabled={inputVal.trim().length < 10 || isLoading}
                            onClick={handleAiChatComplaintSubmit}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${inputVal.trim().length >= 10 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : '🚨 Submit Complaint'}
                        </motion.button>
                    </div>
                );

            case 'complaint_done':
                return <SuccessCard title="Complaint Registered!" subtitle={`ID: ${flowData.complaintId} • We'll respond within 24 hrs.`} color="red" onReset={reset} />;

            /* ═══════ FAQ ═══════ */
            case 'faq':
                return (
                    <div className="mt-3 space-y-2">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden">
                                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 flex justify-between items-center hover:bg-blue-50 transition-colors">
                                    <span>{faq.q}</span>
                                    {expandedFaq === i ? <BsChevronUp className="text-gray-400 flex-shrink-0 ml-2" /> : <BsChevronDown className="text-gray-400 flex-shrink-0 ml-2" />}
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                            <div className="px-4 pb-3 text-xs text-gray-600 leading-relaxed border-t border-blue-50 pt-2">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                );

            default: return null;
        }
    };

    // ─── Drawer UI ──────────────────────────────────────────────────────────────
    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div key="ai-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} className="fixed inset-0 bg-black/30 z-[1000]" />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div key="ai-drawer"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-80 md:w-[380px] bg-white shadow-2xl z-[1001] flex flex-col font-sans">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#0463ac] to-[#0580ca] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                {snapshots.length > 0 && (
                                    <button onClick={goBack} className="text-white/80 hover:text-white mr-1 p-1">
                                        <BsArrowLeft className="text-base" />
                                    </button>
                                )}
                                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                                    <RiRobot2Line className="text-xl text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm leading-tight">AI Assistant</h3>
                                    <p className="text-xs text-blue-100">● Online</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-white/70 hover:text-white transition-opacity">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#f0f4f8' }}>
                            <div className="text-center">
                                <span className="bg-white/80 text-gray-400 text-xs px-3 py-1 rounded-full shadow-sm">Today</span>
                            </div>

                            {/* Message bubbles */}
                            {messages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-end space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    {msg.type === 'bot' && (
                                        <div className="w-7 h-7 bg-gradient-to-tr from-[#0463ac] to-[#0693e3] rounded-full flex items-center justify-center flex-shrink-0 shadow">
                                            <RiRobot2Line className="text-white text-xs" />
                                        </div>
                                    )}
                                    <div className={`relative px-3 py-2 rounded-xl shadow-sm max-w-[80%] text-sm leading-relaxed whitespace-pre-line ${msg.type === 'bot'
                                        ? 'bg-white rounded-tl-none border border-blue-50 text-gray-800'
                                        : 'bg-[#0463ac] text-white rounded-tr-none'
                                        }`}>
                                        {msg.type === 'bot' && <div className="absolute -left-2 top-0 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />}
                                        {msg.type === 'user' && <div className="absolute -right-2 top-0 w-0 h-0 border-t-[8px] border-t-[#0463ac] border-r-[8px] border-r-transparent" />}
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Current step options */}
                            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                {renderStep()}
                            </motion.div>

                            <div ref={bottomRef} />
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 bg-white border-t border-gray-100 flex-shrink-0">
                            <p className="text-center text-xs text-gray-400">Powered by Hommlie AI ✨</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AiChatDrawer;
