import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useCont } from '../../context/MyContext';
import { NavLink, useNavigate } from 'react-router-dom';
import config from '../../config/config';
import axios from 'axios';
import Loading from '../Loading';
import { IoIosArrowDropleftCircle, IoMdClose } from 'react-icons/io';

const CategoryModal = ({ isOpen, onClose, category = [] }) => {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useCont();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [subCatId, setSubCatId] = useState(null);
    const [subCatTitle, setSubCatTitle] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (category?.length > 0) {
            getSubCategoryData();
        }
    }, [category]);

    useEffect(() => {
        const filterItems = () => {
            const categories = [];
            const products = [];
            data.forEach(ct => {
                ct.productsData && ct.productsData.length === 1 ?
                products.push(ct) :
                categories.push(ct)
            });
            console.log(products);
            
            setFilteredProducts(products);
            setFilteredCategories(categories);
        }

        filterItems();
    },[isOpen, data]);

    async function getSubCategoryData() {
        if (category?.length > 0) {
            setData([]);
            const id = category[0];
            setIsLoading(true);
            try {
                const response = await axios.post(`${config.API_URL}/api/subcategory`, { cat_id: id });
                setData(response.data.data.subcategory);
                console.log("categories:", response.data.data);
            } catch (error) {
                console.log("error: " + error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    async function getSubCategoryItems(subCatId) {
        setIsLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}/api/products`, { subcategory_id: subCatId });
            setSubCategoryData(response.data.data);
            console.log("Sub categories:", response.data.data);
        } catch (error) {
            console.log("error: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCategoryClick = (cat) => {
        if (cat.productsData && cat.productsData.length === 1) {
            setSubCategoryData(cat.productsData);
            setSubCatId(cat.subcat_id);
            setSubCatTitle(cat.subcategory_name);
        } else {
            setSubCatId(cat.subcat_id);
            setSubCatTitle(cat.subcategory_name);
            getSubCategoryItems(cat.subcat_id);
        }
    };

    const handleBackClick = () => {
        setSubCatId(null);
    };

    if (!isOpen) return null;

    const handleProductClick = (item) => {
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${slug}`, { state: { id: item.id, title: item.title } });
    };

    const renderProductItem = (item) => (
        <div onClick={() => handleProductClick(item)} key={item.id} className="max-w-xs w-full mx-auto flex flex-col gap-2 p-4 justify-between shadow hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center items-center w-full aspect-square overflow-hidden">
                <img className="w-full h-full object-cover" src={item.productimage.image_url} alt="item" />
            </div>
            <h5 className="text-base font-semibold text-gray-900 w-full truncate">{item.product_name}</h5>
            <p className="text-sm lg:font-semibold flex flex-row gap-2">
                <span>₹{item.discounted_price}</span>
                <span className="line-through font-normal text-gray-400">₹{item.product_price}</span>
            </p>
        </div>
    );

    return (
        <>
        {isLoading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <Loading />
            </div>
        ) : (
            <div className="fixed inset-0 z-20 flex items-center justify-center">
                <div className="fixed inset-0 bg-black bg-opacity-60" onClick={() => {setSubCatId(null);onClose();}}></div>
                <div className="relative bg-white w-[95%] md:w-full max-w-[75rem] h-[90vh] rounded-2xl shadow-lg overflow-hidden z-30 flex flex-col">
                    <div className="sticky top-0 bg-white z-10 p-4 md:p-6 flex justify-between items-center border-b">
                        <h2 className='text-xl font-bold'>
                            {subCatId ? subCatTitle : (category?.length > 0 ? category[1] : "")}
                        </h2>
                        <button onClick={() => {setSubCatId(null);onClose();}} className="text-2xl">
                            <IoMdClose />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
                        {subCatId ? (
                            <div>
                                <div className='flex justify-end mb-4'>
                                    <button onClick={handleBackClick} className="text-2xl"><IoIosArrowDropleftCircle color='grey' /></button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {
                                        subCategoryData ? 
                                        subCategoryData.map(renderProductItem) : 
                                        <div>No Products</div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-6'>
                                <div className="flex flex-col gap-4">
                                    <h2 className='text-lg font-bold'>Categories</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {filteredCategories?.map((ct, index) => (
                                            <div onClick={() => handleCategoryClick(ct)} key={index} className="flex flex-col items-center gap-2 cursor-pointer">
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                                                    <img className="w-full h-full object-cover" src={ct?.subcategory_icon} alt="category" />
                                                </div>
                                                <h5 className="text-sm md:text-base font-semibold text-gray-900 text-center">{ct?.subcategory_name}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {
                                    filteredProducts && filteredProducts.length > 0 &&
                                    <div className="flex flex-col gap-4">
                                        <h2 className='text-lg font-bold'>Products</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            {filteredProducts?.map((item) => (
                                                renderProductItem(item?.productsData[0])
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default CategoryModal;