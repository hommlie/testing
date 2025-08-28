import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";

/**
 * BlogPage.jsx — mobile-first & overflow-safe
 * - Fixes horizontal overflow on small screens
 * - Replaces deprecated aspect-w/h utilities with modern aspect ratio
 * - Click-outside to close category dropdown
 * - Accessible buttons + keyboard support
 * - Defensive checks for undefined fields
 */

const BlogCard = ({ blog, categories, index }) => {
  const navigate = useNavigate();
  const categoryTitle = useMemo(() => {
    const cid = blog?.category_id;
    const item = categories?.find((c) => String(c?.id) === String(cid));
    return item?.title || "General";
  }, [blog?.category_id, categories]);

  const createdAt = useMemo(() => {
    try {
      return new Date(blog?.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "";
    }
  }, [blog?.created_at]);

  const goToPost = () => {
    // Use SPA route when possible; fallback to absolute
    const path = `/blog/${blog?.slug}`;
    if (typeof window !== "undefined" && window?.location) {
      navigate(path);
    } else {
      window.location.href = `${config?.VITE_BASE_URL || ""}${path}`;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Responsive 16:9 cover without layout shift */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          loading="lazy"
          src={blog?.featured_image || "/api/placeholder/800/450"}
          alt={blog?.title || "Blog cover"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium rounded-full">
            {categoryTitle}
          </span>
          {createdAt && (
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {createdAt}
            </div>
          )}
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {blog?.title || "Untitled"}
        </h3>

        {blog?.meta_description && (
          <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base">
            {blog.meta_description}
          </p>
        )}

        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goToPost}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Read Article
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const notify = useToast();
  const notifyOnSuccess = (msg) => notify?.(msg, "success");
  const notifyOnFail = (msg) => notify?.(msg, "error");

  const blogsPerPage = 9;
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${config.API_URL}/api/blogs/getall`);
      if (res?.data?.status === 1) {
        setAllBlogs(res?.data?.data || []);
      } else {
        notifyOnFail(res?.data?.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      notifyOnFail("Something went wrong while fetching blogs");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/blogcategory/getall`);
      if (res?.data?.status === 1) {
        setCategories(res?.data?.data || []);
      } else {
        notifyOnFail(res?.data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      notifyOnFail("Something went wrong while fetching categories");
    }
  };

  // Initial data fetch
  useEffect(() => {
    window?.scrollTo?.(0, 0);
    fetchBlogs();
    fetchCategories();
  }, []);

  // Filter + search
  useEffect(() => {
    let filtered = Array.isArray(allBlogs) ? [...allBlogs] : [];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => String(blog?.category_id) === String(selectedCategory)
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((blog) => {
        const t = blog?.title?.toLowerCase?.() || "";
        const m = blog?.meta_description?.toLowerCase?.() || "";
        return t.includes(q) || m.includes(q);
      });
    }

    setFilteredBlogs(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / blogsPerPage)));
    setCurrentPage(1);
  }, [allBlogs, selectedCategory, searchTerm]);

  // Current page blogs
  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + blogsPerPage);
  }, [filteredBlogs, currentPage]);

  // Canonical URL (stable path)
  const canonicalUrl = useMemo(() => {
    const baseUrl = config?.VITE_BASE_URL || "https://www.hommlie.com";
    return `${baseUrl}/blogs`;
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-clip"
      style={{
            background:
              "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}
    >
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <title>Blogs & Insights | Hommlie</title>
        <meta
          name="description"
          content="Discover the latest trends, tips, and expert insights from Hommlie on pest control, cleaning, hygiene, and more."
        />
      </Helmet>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 py-12 sm:py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-center text-white"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Our Latest Insights
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100 max-w-2xl mx-auto">
              Discover the latest trends, insights, and stories from our experts
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Controls */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-12"
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-8">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 pl-11 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                aria-label="Search articles"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-64" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((s) => !s)}
                className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-left flex justify-between items-center text-sm sm:text-base"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <span className="truncate">
                  {selectedCategory === "all"
                    ? "All Categories"
                    : categories?.find((c) => String(c?.id) === String(selectedCategory))?.title ||
                      "All Categories"}
                </span>
                <Filter className="w-5 h-5 shrink-0 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-30 mt-2 w-full max-h-64 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg"
                  role="listbox"
                >
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-emerald-50 transition-colors text-sm"
                    role="option"
                    aria-selected={selectedCategory === "all"}
                  >
                    All Categories
                  </button>
                  {categories?.map((category) => (
                    <button
                      key={category?.id}
                      onClick={() => {
                        setSelectedCategory(category?.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-50 transition-colors text-sm"
                      role="option"
                      aria-selected={String(selectedCategory) === String(category?.id)}
                    >
                      {category?.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <h3 className="text-base sm:text-lg md:text-xl text-gray-600">
              No articles found matching your criteria
            </h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {currentBlogs.map((blog, index) => (
              <BlogCard key={blog?.id || index} blog={blog} categories={categories} index={index} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-10 mb-8"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-emerald-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border text-sm sm:text-base transition-colors ${
                  currentPage === n
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "border-gray-200 hover:bg-emerald-50"
                }`}
                aria-current={currentPage === n ? "page" : undefined}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-emerald-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.nav>
        )}
      </div>
    </main>
  );
}
