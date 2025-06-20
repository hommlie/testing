import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useCont } from "../../context/MyContext";
import { NavLink, useNavigate } from "react-router-dom";
import config from "../../config/config";
import axios from "axios";
import Loading from "../Loading";
import { IoIosArrowDropleftCircle, IoMdClose } from "react-icons/io";
import NoResultFoundImg from "../../assets/images/noresultfound.svg";

const CategoryModal = ({ isOpen, onClose, category = [], ClickedSubId }) => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useCont();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCatId, setSubCatId] = useState(null);
  const [subCatTitle, setSubCatTitle] = useState(null);

  useEffect(() => {
    if (category?.length > 0) {
      getSubCategoryData();
    }
  }, [category]);

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
      const response = await axios.post(`${config.API_URL}/api/products`, {
        subcategory_id: subCatId,
      });
      setSubCategoryData(response.data.data);
      console.log("Sub categories:", response.data.data);
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
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      ) : (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={() => {
              setSubCatId(null);
              onClose();
            }}
          ></div>
          <div className="relative bg-white w-[95%] md:w-full max-w-[80rem] h-[90vh] rounded-2xl shadow-lg overflow-hidden z-30 flex flex-col">
            <div className="sticky top-0 bg-white z-10 p-4 md:p-6 flex justify-between items-center border-b">
              {subCatId && !ClickedSubId && (
                <div className="flex justify-start">
                  <button onClick={handleBackClick} className="text-2xl">
                    <IoIosArrowDropleftCircle color="grey" />
                  </button>
                </div>
              )}
              <h2 className="w-full text-xl font-bold text-center">
                {subCatId
                  ? subCatTitle
                  : category?.length > 0
                  ? category[1]
                  : ""}
              </h2>
              <button
                onClick={() => {
                  setSubCatId(null);
                  onClose();
                }}
                className="text-2xl"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
              {subCatId ? (
                <div className="">
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                  <div className="max-w-full flex flex-wrap justify-center gap-6">
                    {!subCategoryData && (
                      <div className="h-[60vh]">
                        <img
                          src={NoResultFoundImg}
                          alt=""
                          className="h-full w-full"
                        />
                      </div>
                    )}
                    {subCategoryData?.map((item) => (
                      <div
                        key={item.id}
                        className="flex w-full md:w-1/3 lg:w-1/5 flex-col bg-white border border-[#10847E] rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex justify-center items-center mb-2 md:mb-4">
                          <img
                            className="h-40 w-40 object-contain"
                            src={item.productimage?.image_url}
                            alt={item.product_name}
                          />
                        </div>
                        <h5 className="lg:h-14 line-clamp-2 text-sm md:text-lg font-bold text-gray-900 text-center mb-2">
                          {item.product_naume}
                        </h5>
                        <div className="flex items-center justify-center mb-4">
                          <span className="text-base md:text-xl font-semibold text-[#10847E]">
                            ₹{item.discounted_price}
                          </span>
                          <span className="text-xs md:text-sm text-gray-400 line-through ml-2">
                            ₹{item.product_price}
                          </span>
                        </div>
                        <p
                          className="h-40 text-[10px] md:text-xs text-gray-500 text-justify mb-4 overflow-hidden text-ellipsis py-3 md:py-0"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 10,
                          }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />

                        <button
                          onClick={() =>
                            navigate(
                              `${config.VITE_BASE_URL}/product/${item.slug}`
                            )
                          }
                          className="w-full py-2 text-center text-white bg-[#10847E] hover:shadow-lg rounded-md transition-colors"
                        >
                          View Details.
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {!data && (
                    <div className="h-[60vh]">
                      <img
                        src={NoResultFoundImg}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                  )}
                  {data?.map((ct, index) => (
                    <div
                      onClick={() => handleCategoryClick(ct)}
                      key={index}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                        <img
                          className="w-full h-full object-cover"
                          src={ct?.subcategory_icon}
                          alt="category"
                        />
                      </div>
                      <h5 className="text-sm md:text-base font-semibold text-gray-900 text-center">
                        {ct?.subcategory_name}
                      </h5>
                    </div>
                  ))}
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
