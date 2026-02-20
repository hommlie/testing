import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [recentBookings, setRecentBookings] = useState(
    () => 20 + Math.floor(Math.random() * 21)
  );
  const [recentMinutes, setRecentMinutes] = useState(
    () => 20 + Math.floor(Math.random() * 21)
  );
  const navigate = useNavigate();
  const categoryRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();

    const interval = setInterval(() => {
      setRecentBookings((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        let next = prev + delta;
        if (next < 20) next = 20;
        if (next > 40) next = 40;
        if (next === prev) {
          next = prev + (prev < 40 ? 1 : -1);
        }
        return next;
      });

      setRecentMinutes((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let next = prev + delta;
        if (next < 20) next = 20;
        if (next > 40) next = 40;
        if (next === prev) {
          next = prev + (prev < 40 ? 1 : -1);
        }
        return next;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.API_URL}/api/category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setActiveCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setActiveCategory(categoryId);
      setTimeout(() => {
        const element = categoryRefs.current["detail-panel"];
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleSubCategoryClick = (category, subcategory) => {
    navigate(`/subcategory/${subcategory.slug}`);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategory =
    filteredCategories.find((c) => c.id === activeCategory) ||
    filteredCategories[0] ||
    null;

  const totalServices = categories.reduce(
    (sum, c) => sum + (c.Subcategories ? c.Subcategories.length : 0),
    0
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const subcategoryItem = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <main className="bg-white text-slate-900 md:min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 pb-10 md:pt-8 md:pb-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-emerald-50 px-4 py-6 md:px-8 md:py-8 mb-6 md:mb-6 border border-emerald-100"
        >
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3 md:space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs md:text-sm font-medium text-emerald-900"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
                  ★
                </span>
                Trusted home services, curated for you
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl leading-tight font-semibold md:text-4xl md:leading-tight text-slate-900"
              >
                Discover services that keep your{" "}
                <span className="underline decoration-white/60">home happy</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-slate-700"
              >
                Browse all categories in one place, compare options instantly,
                and tap into expert services tailored to your needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3 text-xs md:text-sm"
              >
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold">
                    {categories.length || "--"}{" "}
                    <span className="font-normal">service categories</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-[ping_1.8s_ease-out_infinite]" />
                  <span className="font-semibold">
                    {totalServices || "--"}{" "}
                    <span className="font-normal">individual services</span>
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-2 md:mt-0 md:w-72 lg:w-80"
            >
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  boxShadow: [
                    "0 18px 40px rgba(15,23,42,0.35)",
                    "0 30px 55px rgba(15,23,42,0.55)",
                    "0 18px 40px rgba(15,23,42,0.35)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-2xl bg-white p-4 border border-emerald-100 shadow-sm"
              >
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-[11px] font-semibold text-white">
                        H
                      </span>
                      Live service overview
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                      Updated now
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-2xl bg-emerald-50 p-3 border border-emerald-100">
                      <p className="text-slate-500 mb-1">Live bookings</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        {recentBookings}
                      </p>
                      <p className="mt-1 text-[10px] text-emerald-700/80">
                        bookings in the last{" "}
                        <span className="font-semibold">
                          {recentMinutes} min
                        </span>
                      </p>
                    </div>
                    <div className="rounded-2xl bg-sky-50 p-3 border border-sky-100">
                      <p className="text-slate-500 mb-1">Avg. rating</p>
                      <p className="text-lg font-semibold text-yellow-300">
                        4.8
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Based on{" "}
                        <span className="font-semibold">10k+ reviews</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "tel:6363865658";
                    }}
                    className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 px-3 py-2 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-emerald-50"
                  >
                    <div className="flex flex-col items-start text-left">
                      <p className="text-[11px] text-emerald-700">
                        Need help choosing?
                      </p>
                      <p className="text-xs font-medium text-emerald-900">
                        Tap to call our expert: <span className="underline">6363865658</span>
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: "easeInOut",
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-col gap-3 md:flex-row md:items-center"
          >
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
              <input
                type="text"
                placeholder="Search by service category (e.g. Pest control, Cleaning)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-2xl border border-emerald-200 bg-white pl-9 pr-3 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
            {filteredCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
                {filteredCategories.slice(0, 3).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSearchTerm(category.category_name);
                      setActiveCategory(category.id);
                      setExpandedCategory(category.id);
                    }}
                    className={`rounded-full border px-3 py-1 transition-all ${
                      activeCategory === category.id
                        ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {category.category_name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-8">
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3 md:space-y-4"
          >
            {filteredCategories.map((category) => (
              <motion.button
                key={category.id}
                type="button"
                variants={item}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm md:px-4 md:py-4 transition-all ${
                  activeCategory === category.id
                    ? "border-emerald-400 bg-emerald-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40"
                }`}
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-2xl md:h-11 md:w-11">
                  <motion.img
                    src={category.motion_graphics || category.image_url}
                    alt={category.alt_tag || category.category_name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-emerald-500/20 mix-blend-soft-light" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                      Category
                    </p>
                    {category.Subcategories && (
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                        {(category.Subcategories || []).length} services
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {category.category_name}
                  </p>
                  <p className="hidden text-xs text-slate-500 md:block">
                    Tap to preview all services and book instantly.
                  </p>
                </div>
                <motion.div
                  animate={{
                    rotate:
                      activeCategory === category.id &&
                      expandedCategory === category.id
                        ? 180
                        : 0,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 16 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 group-hover:border-emerald-400"
                >
                  <ChevronDown className="h-4 w-4 text-slate-600" />
                </motion.div>
                {activeCategory === category.id && (
                  <motion.span
                    layoutId="active-glow"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-emerald-100/70 blur-xl"
                  />
                )}
              </motion.button>
            ))}

            {filteredCategories.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
                <p className="text-base font-medium text-slate-900">
                  No services found for &quot;{searchTerm}&quot;
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different keyword or clear the search to see all
                  categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory(null);
                    setExpandedCategory(null);
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
                >
                  Clear search
                </button>
              </div>
            )}
          </motion.section>

          <section
            ref={(el) => {
              categoryRefs.current["detail-panel"] = el;
            }}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm"
          >
            {selectedCategory ? (
              <div className="relative space-y-4 md:space-y-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      Service focus
                    </p>
                    <h2 className="text-xl font-semibold md:text-2xl text-slate-900">
                      {selectedCategory.category_name}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-slate-500">
                      Explore all offerings inside this category and pick what
                      fits best for your home.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 border border-slate-200">
                    <div className="h-8 w-8 overflow-hidden rounded-xl">
                      <img
                        src={
                          selectedCategory.motion_graphics ||
                          selectedCategory.image_url
                        }
                        alt={
                          selectedCategory.alt_tag ||
                          selectedCategory.category_name
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="text-slate-500">Available services</p>
                      <p className="font-medium text-slate-900">
                        {(selectedCategory.Subcategories || []).length} options
                      </p>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {expandedCategory === selectedCategory.id &&
                    selectedCategory.Subcategories &&
                    selectedCategory.Subcategories.length > 0 && (
                      <motion.div
                        key={selectedCategory.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Tap a service to continue
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live availability
                          </div>
                        </div>
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                        >
                          {selectedCategory.Subcategories.map((subcategory) => (
                            <motion.button
                              key={subcategory.id}
                              type="button"
                              variants={subcategoryItem}
                              onClick={() =>
                                handleSubCategoryClick(
                                  selectedCategory,
                                  subcategory
                                )
                              }
                              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-900 transition-all hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-50/60 hover:shadow-md"
                            >
                              <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                                  <img
                                    src={subcategory.app_icon}
                                    alt={subcategory.subcategory_name}
                                    className="h-full w-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-emerald-500/25 mix-blend-soft-light" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[11px] uppercase tracking-wide text-emerald-700">
                                    Service
                                  </p>
                                  <p className="text-xs font-semibold md:text-sm line-clamp-2 text-slate-900">
                                    {subcategory.subcategory_name}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                                <span>Tap to view details</span>
                                <span className="inline-flex items-center gap-1 text-emerald-600">
                                  <span>Book</span>
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                </AnimatePresence>

                {(!selectedCategory.Subcategories ||
                  selectedCategory.Subcategories.length === 0) && (
                  <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                    <p className="text-sm font-medium text-slate-900">
                      Services coming soon
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      We&apos;re curating providers for this category. Please
                      check back shortly or explore another category.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative flex min-h-[220px] flex-col items-center justify-center text-center">
                <p className="text-base font-medium text-slate-900">
                  Start by choosing a category
                </p>
                <p className="mt-2 max-w-xs text-sm text-slate-500">
                  We&apos;ll show you all the services and help you land on the
                  perfect one in just a few taps.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
