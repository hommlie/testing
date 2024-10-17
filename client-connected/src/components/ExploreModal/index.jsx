import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useCont } from '../../context/MyContext';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import config from '../../config/config';

const ExploreModal = ({ isOpen, onClose, items, title }) => {

    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleProductClick = (item) => {
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${item.id}/${slug}`);
    };

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div className="fixed inset-0 opacity-60" style={{ backgroundColor: "black" }} onClick={() => {onClose();}}></div>
            <div className="relative bg-white w-[90%] md:w-full max-w-[60rem] max-h-[40rem] overflow-y-scroll p-4 md:p-8 md:px-12 rounded-2xl shadow-lg overflow-hidden z-30 space-y-4 scrollbar-hide">
                {/* <div className='w-full mb-4'>
                    <video className="h-full w-full rounded-lg" autoPlay muted>
                        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div> */}
                <div className=''>
                    <h2 className='text-lg font-bold'>
                        {title}
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {items?.map((item, index) => (
                        <div onClick={() => handleProductClick(item)} key={index} className="max-w-xs h-full mx-auto flex flex-col gap-2 p-4 justify-between hover:shadow-xl rounded-lg">
                            <div className="">
                                <img className="w-60 h-[100px] sm:h-56 object-cover" src={item?.productimage?.image_url} alt="product" />
                            </div>
                            <h5 className="text-base font-semibold text-gray-900 w-full">{item?.product_name}</h5>
                            <p className="text-sm lg:font-semibold flex flex-row gap-2">
                                <span>₹{item?.discounted_price}</span>
                                <span className="line-through font-normal" style={{color: "#ADB6BB"}}>₹{item?.product_price}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreModal;
