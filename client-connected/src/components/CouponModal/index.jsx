import React, { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCont } from '../../context/MyContext';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import config from '../../config/config';
import couponSucess from '../Lotties/couponSuccess.json';

const CouponModal = ({ isOpen, onClose, totalAmount, cat_id }) => {
    const { selectedCoupon, setSelectedCoupon } = useCont();
    const [searchTerm, setSearchTerm] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [enableLottie, setEnableLottie] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    async function getCoupons() {
        await axios.post(`${config.API_URL}/api/coupons`,
            {
                cat_id,
            }
        )
        .then(response => {        
            if(response.data.status === 1) {
                setCoupons(response.data.data);
                // localStorage.setItem(`HommlieCoupons`, JSON.stringify(response.data.data));
            }
        })
        .catch(error => {
            console.log("error getting coupons:", error);
        })
    }

    useEffect(() => {
        getCoupons();
        if (coupons?.length) {
            setFilteredCoupons(coupons);
        } else {
            setFilteredCoupons([]);
        }
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, coupons]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const newCoupons = coupons?.filter(cp =>
            cp.coupon_name?.toLowerCase().includes(value.toLowerCase()) ||
            cp.subTitle?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCoupons(newCoupons);
    };

    const calculateDiscount = (coupon) => {
        if (coupon.amount && coupon.amount !== "") {
            return Number(coupon.amount);
        } else if (coupon.percentage && coupon.percentage !== "") {
            return (totalAmount * Number(coupon.percentage)) / 100;
        }
        return 0;
    };

    const handleApply = () => {
        const coupon = filteredCoupons.find(cp => cp.coupon_name.toLowerCase() === searchTerm.toLowerCase());
        if (coupon) {
            applySelectedCoupon(coupon);
        } else {
            console.log("Invalid coupon code");
        }
    };

    const applySelectedCoupon = (coupon) => {
        const discount = calculateDiscount(coupon);
        setAppliedCoupon({ ...coupon, calculatedDiscount: discount });
        setSelectedCoupon({ ...coupon, calculatedDiscount: discount });
        localStorage.setItem('HommlieselectedCoupon', JSON.stringify({ ...coupon, calculatedDiscount: discount }));
        setEnableLottie(true);
        setTimeout(() => {
            setEnableLottie(false);
            onClose();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div className="fixed inset-0 opacity-60" style={{ backgroundColor: "black" }} onClick={onClose}></div>
            {enableLottie && (
                <Player
                    autoplay
                    loop
                    src={couponSucess}
                    className="absolute top-0 left-0 w-full h-full"
                />
            )}
            <div style={{ backgroundColor: "#F6F1F7" }} className="relative w-[80%] md:w-full max-w-[25rem] max-h-[35rem] pb-4 overflow-y-scroll rounded-2xl overflow-hidden z-30 scrollbar-hide">
                <div className='relative flex flex-row gap-2 items-center justify-center w-full bg-white p-4 '>
                    <button onClick={onClose}><IoMdArrowRoundBack className='absolute left-4 w-4 h-4' /></button>
                    <h2 className=' font-bold text-center'>Apply Coupon</h2>
                </div>
                <div className='flex flex-row gap-2 items-center justify-center w-full px-4 my-4'>
                    <input 
                        type="text" 
                        onChange={e => setSearchTerm(e.target.value)} 
                        value={searchTerm} 
                        className='w-4/5 h-10 rounded-md pl-4' 
                        placeholder='Enter Coupon Code' 
                    />
                    <button 
                        onClick={handleApply}
                        className='w-1/5 font-bold' 
                        style={{ color: "#FF3269" }}
                    >
                        APPLY
                    </button>
                </div>
                <div className='flex flex-col gap-4 justify-center w-full px-4 my-2'>
                    <h3 className='font-bold'>Available Coupons</h3>
                    {filteredCoupons?.map((cp, index) => (
                        <div key={index} className='relative bg-white rounded-md shadow-md p-2 px-8 space-y-3'>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col'>
                                    <span className='text-xl font-bold'>{cp.coupon_name}</span>
                                </div>
                                <div className='w-1/5'>
                                    <button 
                                        onClick={() => applySelectedCoupon(cp)} 
                                        className='font-bold' 
                                        style={{ color: "#FF3269" }}
                                    >
                                        APPLY
                                    </button>
                                </div>
                            </div>
                            <div className="" style={{ border: "1px dashed #E5E7EB" }}></div>
                            <div>
                                {cp?.percentage
                                    ? <p className='text-xs' style={{ color: "rgba(0,0,0,0.4)" }}>{cp.percentage}% OFF</p>
                                    : cp?.amount ? <p className='text-xs' style={{ color: "rgba(0,0,0,0.4)" }}>₹{cp.amount} OFF</p> : ""
                                }
                            </div>
                            <div className="absolute top-4 -left-4  w-3 h-3 md:w-7 md:h-7 rounded-full" style={{ backgroundColor: "#F6F1F7" }}></div>
                            <div className="absolute top-4 -right-4  w-3 h-3 md:w-7 md:h-7 rounded-full" style={{ backgroundColor: "#F6F1F7" }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CouponModal;