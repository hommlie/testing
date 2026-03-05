import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../../config/config";
import { Zap, ShoppingBag, Briefcase, Star, Filter, ChevronDown, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ================== DATA ================== */

const PRODUCTS = [
  {
    id: 1,
    title: "Hompure Termite Control",
    img: "/images/product1.png",
    price: 1599,
    mrp: 2746,
    rating: 4.6,
    category: "Pest Control",
    bestseller: true,
  },
  {
    id: 2,
    title: "Hompure Bed Bug Spray",
    img: "/images/product1.png",
    price: 1399,
    mrp: 2067,
    rating: 4.4,
    category: "Pest Control",
  },
  {
    id: 3,
    title: "Hompure Floor Disinfectant",
    img: "/images/product1.png",
    price: 799,
    mrp: 1145,
    rating: 4.7,
    category: "Cleaning",
  },
  {
    id: 4,
    title: "Hompure Bathroom Cleaner",
    img: "/images/product1.png",
    price: 899,
    mrp: 1299,
    rating: 4.5,
    category: "Cleaning",
  },
];

/* ================== COMPONENTS ================== */

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <aside className="hidden lg:block w-72 space-y-8 pr-8 border-r border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-800" />
        <h3 className="font-bold text-xl text-gray-900 tracking-tight">Filter By</h3>
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Category</p>
          <div className="space-y-2">
            {["All", "Pest Control", "Cleaning"].map((cat) => (
              <label
                key={cat}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${filters.category === cat ? "bg-blue-50/50 text-[#0463ac]" : "hover:bg-gray-50 text-gray-600"
                  }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${filters.category === cat ? "border-[#0463ac] bg-white" : "border-gray-200"
                  }`}>
                  {filters.category === cat && <div className="w-2.5 h-2.5 rounded-full bg-[#0463ac]" />}
                </div>
                <input
                  type="radio"
                  className="hidden"
                  checked={filters.category === cat}
                  onChange={() => setFilters({ ...filters, category: cat })}
                />
                <span className="font-semibold text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price Range</p>
          <label className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all text-gray-600">
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#0463ac] accent-[#0463ac] focus:ring-[#0463ac]/20"
              checked={filters.under1000}
              onChange={(e) =>
                setFilters({ ...filters, under1000: e.target.checked })
              }
            />
            <span className="font-semibold text-sm">Under ₹1000</span>
          </label>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Customer Rating</p>
          <label className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all text-gray-600">
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#0463ac] accent-[#0463ac] focus:ring-[#0463ac]/20"
              checked={filters.rating4}
              onChange={(e) =>
                setFilters({ ...filters, rating4: e.target.checked })
              }
            />
            <span className="font-semibold text-sm">4.0 ★ & above</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

const ProductCard = ({ p }) => {
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={p.img}
          alt={p.title}
          className="w-full h-full object-contain p-6 mix-blend-multiply"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {p.bestseller && (
            <span className="bg-orange-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Bestseller
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 capitalize">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            Save {discount}%
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#0463ac] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
            {p.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span>{p.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-4 group-hover:text-[#0463ac] transition-colors line-clamp-2 min-h-[3rem]">
          {p.title}
        </h3>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs line-through font-medium">₹{p.mrp}</span>
            <span className="text-2xl font-black text-gray-900">₹{p.price}</span>
          </div>

          <button className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white hover:bg-[#0463ac] transition-all duration-300 shadow-md active:scale-95 group/btn">
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================== MAIN PAGE ================== */

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    category: "All",
    under1000: false,
    rating4: false,
  });

  const [sort, setSort] = useState("popular");
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/product")) {
      setActiveTab("products");
    } else {
      setActiveTab("services");
    }
  }, [location.pathname]);

  const filteredProducts = useMemo(() => {
    let data = [...PRODUCTS];

    if (filters.category !== "All") {
      data = data.filter((p) => p.category === filters.category);
    }
    if (filters.under1000) {
      data = data.filter((p) => p.price < 1000);
    }
    if (filters.rating4) {
      data = data.filter((p) => p.rating >= 4);
    }

    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);
    if (sort === "discount") {
      data.sort((a, b) => ((b.mrp - b.price) / b.mrp) - ((a.mrp - a.price) / a.mrp));
    }

    return data;
  }, [filters, sort]);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header Space (Matching main header height) */}
      <div className="hidden sm:block h-[1px] bg-gray-50" />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 sm:py-24 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0463ac] text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-blue-100/50"
            >
              Professional Grade
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-[1.05] mb-6"
            >
              Premium Home Care <br />
              <span className="text-[#0463ac]">Products</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 font-medium leading-relaxed mb-8 max-w-lg"
            >
              The same high-performance solutions used by our technicians, now available for your home. Trusted by 10,000+ families.
            </motion.p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-[#fafafa] via-transparent to-transparent z-10" />
          <img
            src="/images/homebg.jpeg"
            className="w-full h-full object-cover opacity-60"
            alt="Product Background"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12">
        {/* Mobile Filter & Tabs */}
        {isMobile && (
          <div className="mb-8 space-y-4">
            <div className="w-full flex justify-center bg-white border-b border-gray-100 pb-4">
              <div className="w-full grid grid-cols-3 gap-2">
                {[
                  { id: "services", label: "Services", icon: Zap, internal: true, route: "/" },
                  { id: "products", label: "Products", icon: ShoppingBag, internal: false, route: "https://hommlie.shop" },
                  { id: "commercial", label: "Commercial", icon: Briefcase, internal: false, route: "https://b2b.hommlie.com/" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-2xl text-[11px] font-bold transition-all shadow-sm ${activeTab === tab.id
                        ? "bg-[#0463ac] text-white shadow-[#0463ac]/20"
                        : "bg-gray-50 text-gray-500 border border-gray-100"
                      }`}
                    onClick={() => {
                      if (tab.internal) {
                        setActiveTab(tab.id);
                        navigate(tab.route);
                      } else {
                        window.location.href = tab.route;
                      }
                    }}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Product Feed */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Our Collection</h2>
                <p className="text-sm font-medium text-gray-400 mt-1">{filteredProducts.length} Premium items found</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="relative group">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-gray-50 border border-transparent hover:border-gray-200 text-gray-900 font-bold text-sm rounded-2xl px-6 py-3.5 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="discount">Best Value</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products match your filters</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => setFilters({ category: "All", under1000: false, rating4: false })}
                  className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-[#0463ac] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12">
        <div className="bg-[#0463ac] rounded-[2.5rem] p-8 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-blue-100/80 font-medium mb-8 max-w-sm">
              Our experts are ready to recommend the perfect professional solution for your needs.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button className="px-8 py-4 bg-white text-[#0463ac] rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
                Consult an Expert
              </button>
              <button className="px-8 py-4 bg-blue-400/20 text-white border border-blue-400/30 rounded-2xl font-bold hover:bg-blue-400/30 transition-all">
                View FAQ
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 pointer-events-none">
            <img src="/images/homebg.jpeg" className="w-full h-full object-cover" alt="Support Decor" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
