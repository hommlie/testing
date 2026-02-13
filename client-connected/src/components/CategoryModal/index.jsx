import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useCont } from "../../context/MyContext";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../../config/config";
import axios from "axios";
import Loading from "../Loading";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import NoResultFoundImg from "../../assets/images/noresultfound.svg";

const CategoryModal = ({ isOpen, onClose, category = [], ClickedSubId }) => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useCont();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCatId, setSubCatId] = useState(null);
  const [subCatTitle, setSubCatTitle] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (category?.length > 0) {
      getSubCategoryData();
    }
  }, [category]);

  useEffect(() => {
    onClose();
    setSubCatId(null);
  }, [location.pathname]);

  useEffect(() => {
    if (ClickedSubId) {
      setSubCatId(ClickedSubId);
      getSubCategoryItems(ClickedSubId);
    }
  }, [isOpen]);

  async function getSubCategoryData() {
    if (category?.length > 0) {
      setData([]);
      const id = category[0];
      setIsLoading(true);
      try {
        const response = await axios.post(`${config.API_URL}/api/subcategory`, {
          cat_id: id,
        });
        setData(response.data.data.subcategory);
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
      const response = await axios.post(`${config.API_URL}/api/products`, {
        subcategory_id: subCatId,
      });
      setSubCategoryData(response.data.data);
    } catch (error) {
      console.log("error: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCategoryClick = (cat) => {
    if (cat.category.is_page === 1) {
      navigate(`${config.VITE_BASE_URL}/subcategory/${cat.slug}`);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setSubCatId(null);
              onClose();
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-5xl h-[85vh] md:max-h-[800px] rounded-[32px] shadow-2xl overflow-hidden z-[101] flex flex-col border border-gray-100"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 md:p-8 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center gap-4">
                {subCatId && !ClickedSubId && (
                  <button
                    onClick={handleBackClick}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  >
                    <IoIosArrowBack size={24} className="text-gray-600 group-hover:text-black" />
                  </button>
                )}
                <h2 className="text-xl md:text-2xl font-extrabold text-[#033053]">
                  {subCatId
                    ? subCatTitle
                    : category?.length > 0
                      ? category[1]
                      : ""}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSubCatId(null);
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoMdClose size={24} className="text-gray-500 hover:text-black" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 scrollbar-hide">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loading />
                </div>
              ) : subCatId ? (
                /* Products View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {(!subCategoryData || subCategoryData.length === 0) ? (
                    <div className="col-span-full py-20 flex flex-col items-center">
                      <img src={NoResultFoundImg} alt="No results" className="w-48 h-48 mb-4 opacity-50" />
                      <p className="text-gray-400 font-medium">No services found in this category</p>
                    </div>
                  ) : (
                    subCategoryData.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col items-center group snap-start relative py-4"
                      >
                        {/* Circular Image wrapper */}
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#f8f1dd]/50 flex items-center justify-center relative z-10 -mb-20 transition-transform duration-500 group-hover:scale-110">
                          <img
                            src={item.productimage?.image_url}
                            alt={item.product_name}
                            className="w-3/4 h-3/4 object-contain"
                          />
                        </div>

                        {/* Content Card below */}
                        <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 pt-24 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                          <h5 className="text-lg font-bold text-[#033053] mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {item.product_name}
                          </h5>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl font-extrabold text-emerald-600">
                              ₹{item.discounted_price}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{item.product_price}
                            </span>
                          </div>
                          <button
                            onClick={() => navigate(`${config.VITE_BASE_URL}/product/${item.slug}`)}
                            className="w-full py-3 bg-[#0463ac] hover:bg-[#033053] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95"
                          >
                            Book Now
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              ) : (
                /* Subcategories Grid View */
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
                  {(!data || data.length === 0) ? (
                    <div className="col-span-full py-20 flex flex-col items-center">
                      <img src={NoResultFoundImg} alt="No categories" className="w-48 h-48 mb-4 opacity-50" />
                      <p className="text-gray-400 font-medium">No subcategories available</p>
                    </div>
                  ) : (
                    data.map((ct, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleCategoryClick(ct)}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <img
                          className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-110"
                          src={ct?.subcategory_icon}
                          alt={ct?.subcategory_name}
                        />
                        <h5 className="text-[10px] sm:text-xs md:text-sm font-bold text-[#033053] text-center group-hover:text-[#0463ac] transition-colors leading-tight px-1">
                          {ct?.subcategory_name}
                        </h5>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
