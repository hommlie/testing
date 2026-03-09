import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import { BsArrowLeft, BsCheckCircleFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';

// ─── Static Data ───────────────────────────────────────────────────────────────
const SERVICES = [
    { label: '🏠 Home Cleaning', name: 'Home Cleaning' },
    { label: '🪠 Plumbing', name: 'Plumbing' },
    { label: '⚡ Electrical', name: 'Electrical' },
    { label: '🎨 Painting', name: 'Painting' },
    { label: '🛠️ Carpentry', name: 'Carpentry' },
    { label: '❄️ AC Service', name: 'AC Service' },
];

const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Office'];

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

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

const MOCK_BOOKINGS = [
    { id: 'HML-2024-001', service: '🏠 Home Cleaning', date: '10 Mar 2024', time: '11:00 AM', status: 'Scheduled', statusColor: 'text-blue-600 bg-blue-50' },
    { id: 'HML-2024-002', service: '⚡ Electrical', date: '5 Mar 2024', time: '3:00 PM', status: 'Completed', statusColor: 'text-green-600 bg-green-50' },
];

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
        return {
            label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
            value: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
    });
};

// ─── Sub-components ────────────────────────────────────────────────────────────
const OptionList = ({ options }) => (
    <div className="space-y-2 mt-3">
        {options.map((opt) => (
            <motion.button key={opt.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
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

    const [messages, setMessages] = useState(INIT_MSGS);
    const [step, setStep] = useState('welcome');
    const [snapshots, setSnapshots] = useState([]);
    const [flowData, setFlowData] = useState({});
    const [inputVal, setInputVal] = useState('');
    const [otpVal, setOtpVal] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const bottomRef = useRef(null);

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

    const go = (nextStep, userMsg = null, botMsg = null, data = {}) => {
        setSnapshots(prev => [...prev, { step, messages: [...messages], flowData: { ...flowData } }]);
        setMessages(prev => [
            ...prev,
            ...(userMsg ? [{ type: 'user', text: userMsg }] : []),
            ...(botMsg ? [{ type: 'bot', text: botMsg }] : []),
        ]);
        setFlowData(prev => ({ ...prev, ...data }));
        setStep(nextStep); setInputVal(''); setOtpVal('');
    };

    const goBack = () => {
        if (!snapshots.length) return;
        const last = snapshots[snapshots.length - 1];
        setSnapshots(prev => prev.slice(0, -1));
        setStep(last.step); setMessages(last.messages); setFlowData(last.flowData);
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
                    { label: '📦 Track Booking', onClick: () => go('track_mobile', 'Track My Booking', 'Please enter your registered mobile number.') },
                    { label: '🚨 Raise Complaint', onClick: () => go('complaint_id', 'Raise a Complaint', "Sorry to hear that! Please enter your Booking ID.") },
                    { label: '❓ Ask a Question', onClick: () => go('faq', 'Ask a Question', 'Here are some FAQs. Tap any to expand 👇') },
                ]} />;

            /* ═══════ BOOK SERVICE ═══════ */
            case 'book_service':
                return <ChipGrid chips={SERVICES.map(s => ({
                    label: s.label,
                    onClick: () => go('book_property', s.label, `For ${s.name}, what type of property?`, { service: s.label, serviceName: s.name }),
                }))} />;

            case 'book_property':
                return <ChipGrid cols3 chips={PROPERTY_TYPES.map(p => ({
                    label: p,
                    onClick: () => {
                        const price = PRICES[flowData.serviceName]?.[p] || '₹499';
                        go('book_price_show', p, 'Here are the details for your selection:', { property: p, price });
                    },
                }))} />;

            case 'book_price_show':
                return <PriceCard
                    service={flowData.service} property={flowData.property} price={flowData.price}
                    onBook={() => go('book_mobile', '✅ Book Now', 'Please enter your mobile number to continue.')}
                    onExpert={() => go('talk_expert', '💬 Talk to Expert', 'Our expert will call you shortly. Please share your number.')}
                />;

            /* ═══════ MOBILE / OTP ═══════ */
            case 'book_mobile':
            case 'track_mobile':
            case 'talk_expert':
                return <MobileInput value={inputVal} onChange={setInputVal}
                    label={step === 'talk_expert' ? '📞 Request Callback' : '📨 Send OTP'}
                    onSubmit={() => {
                        if (step === 'talk_expert') {
                            go('talk_expert_done', `📱 +91 ${inputVal}`, `Our expert will call +91 ${inputVal} shortly!`, { mobile: inputVal });
                        } else {
                            const next = step === 'track_mobile' ? 'track_otp' : 'book_otp';
                            go(next, `📱 +91 ${inputVal}`, `OTP sent to +91 ${inputVal}. Please enter it below.`, { mobile: inputVal });
                        }
                    }}
                />;

            case 'book_otp':
                return <OtpInput value={otpVal} onChange={setOtpVal}
                    onSubmit={() => go('book_address', `🔐 ${otpVal}`, '✅ OTP verified! Please enter your service address.')} />;

            case 'track_otp':
                return <OtpInput value={otpVal} onChange={setOtpVal}
                    onSubmit={() => go('track_bookings', `🔐 ${otpVal}`, 'Here are your recent bookings 📋')} />;

            /* ═══════ ADDRESS / DATE / TIME ═══════ */
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
                    onClick: () => go('book_time', d.label, `Select a time slot for ${d.value} 🕐`, { date: d.value }),
                }))} />;

            case 'book_time':
                return <ChipGrid chips={TIME_SLOTS.map(t => ({
                    label: `🕐 ${t}`,
                    onClick: () => go('book_summary', t, "Here's your booking summary. Please review and confirm 📋", { timeSlot: t }),
                }))} />;

            /* ═══════ SUMMARY / CONFIRM ═══════ */
            case 'book_summary': {
                const { service, property, price, address, date, timeSlot } = flowData;
                return (
                    <div className="mt-3 space-y-2">
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-2">
                            <h4 className="font-bold text-gray-800 text-sm border-b pb-2">📋 Booking Summary</h4>
                            {[['Service', service], ['Property', property], ['Date', date], ['Time', timeSlot], ['Address', address], ['Price', price]].map(([k, v]) => (
                                <div key={k} className="flex justify-between items-start">
                                    <span className="text-xs text-gray-500 flex-shrink-0">{k}</span>
                                    <span className="text-xs font-semibold text-gray-800 text-right ml-2 max-w-[60%]">{v}</span>
                                </div>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                const id = 'HML-' + Date.now().toString().slice(-6);
                                go('book_confirmed', '✅ Confirm Booking', `🎉 Booking confirmed!\nYour Booking ID: ${id}`, { bookingId: id });
                            }}
                            className="w-full py-3 bg-[#0463ac] text-white rounded-xl font-semibold text-sm hover:bg-[#0352a0] transition-colors">
                            ✅ Confirm Booking
                        </motion.button>
                    </div>
                );
            }

            case 'book_confirmed':
                return <SuccessCard title="Booking Confirmed!" subtitle={`Booking ID: ${flowData.bookingId}`} onReset={reset} />;

            case 'talk_expert_done':
                return <SuccessCard title="Request Received!" subtitle={`Expert will call +91 ${flowData.mobile} shortly.`} color="green" onReset={reset} />;

            /* ═══════ CHECK PRICE ═══════ */
            case 'price_service':
                return <ChipGrid chips={SERVICES.map(s => ({
                    label: s.label,
                    onClick: () => go('price_property', s.label, `For ${s.name}, select property type:`, { service: s.label, serviceName: s.name }),
                }))} />;

            case 'price_property':
                return <ChipGrid cols3 chips={PROPERTY_TYPES.map(p => ({
                    label: p,
                    onClick: () => {
                        const price = PRICES[flowData.serviceName]?.[p] || '₹499';
                        go('price_show', p, 'Here\'s the pricing breakdown 💰', { property: p, price });
                    },
                }))} />;

            case 'price_show':
                return <PriceCard
                    service={flowData.service} property={flowData.property} price={flowData.price}
                    onBook={() => go('book_mobile', '📅 Book This Service', 'Please enter your mobile number to continue.')}
                    onExpert={() => go('talk_expert', '💬 Talk to Expert', 'Our expert will call you shortly. Please share your number.')}
                />;

            /* ═══════ TRACK BOOKING ═══════ */
            case 'track_bookings':
                return (
                    <div className="mt-3 space-y-2">
                        {MOCK_BOOKINGS.map(b => (
                            <motion.button key={b.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                onClick={() => go('track_status', `Booking ${b.id}`, `Details for booking ${b.id}:`, { selectedBooking: b })}
                                className="w-full text-left bg-white border border-blue-100 rounded-xl p-3 shadow-sm hover:bg-blue-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{b.service}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{b.date} • {b.time}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">ID: {b.id}</p>
                            </motion.button>
                        ))}
                    </div>
                );

            case 'track_status': {
                const b = flowData.selectedBooking;
                if (!b) return null;
                return (
                    <div className="mt-3 space-y-2">
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h4 className="font-bold text-gray-800 text-sm">Booking Details</h4>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
                            </div>
                            {[['Booking ID', b.id], ['Service', b.service], ['Date', b.date], ['Time', b.time]].map(([k, v]) => (
                                <div key={k} className="flex justify-between">
                                    <span className="text-xs text-gray-500">{k}</span>
                                    <span className="text-xs font-semibold text-gray-800">{v}</span>
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
            case 'complaint_id':
                return (
                    <div className="mt-3 space-y-2">
                        <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
                            placeholder="e.g. HML-2024-001"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none shadow-sm focus:border-blue-300" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            disabled={inputVal.trim().length < 5}
                            onClick={() => go('complaint_type', inputVal, 'What is the nature of your complaint?', { complaintBookingId: inputVal })}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${inputVal.trim().length >= 5 ? 'bg-[#0463ac] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            Continue →
                        </motion.button>
                    </div>
                );

            case 'complaint_type':
                return <OptionList options={COMPLAINT_TYPES.map(ct => ({
                    label: ct,
                    onClick: () => go('complaint_describe', ct, 'Please describe the issue in detail.', { complaintType: ct }),
                }))} />;

            case 'complaint_describe':
                return (
                    <div className="mt-3 space-y-2">
                        <textarea value={inputVal} onChange={e => setInputVal(e.target.value)} rows={4}
                            placeholder="Describe your issue here..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none shadow-sm focus:border-blue-300 resize-none" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            disabled={inputVal.trim().length < 10}
                            onClick={() => {
                                const cid = 'CMP-' + Date.now().toString().slice(-6);
                                go('complaint_done', inputVal, `✅ Complaint registered!\nComplaint ID: ${cid}\nWe'll reach you within 24 hours.`, { complaintDesc: inputVal, complaintId: cid });
                            }}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${inputVal.trim().length >= 10 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            🚨 Submit Complaint
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
