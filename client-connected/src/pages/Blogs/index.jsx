import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import axios from "axios";
import { motion } from "framer-motion";

const BlogCard = ({ blog, categories, index }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={blog.featured_image || "/api/placeholder/400/300"}
          alt={blog.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full">
            {categories?.find((c) => c.id === blog.category_id)?.title}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3">
          {blog.meta_description}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`${config.VITE_BASE_URL}/blog/${blog.slug}`)}
          className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium 
                   hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
        >
          Read Article
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
};

const BlogPage = () => {
  const navigate = useNavigate();
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
  const notifyOnSuccess = (success) => notify(success, "success");
  const notifyOnFail = (error) => notify(error, "error");

  const blogsPerPage = 9;

  // Fetch all blogs
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${config.API_URL}/api/blogs/getall`);
      if (res.data.status === 1) {
        setAllBlogs(res.data?.data || []);
      } else {
        notifyOnFail(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/blogcategory/getall`);
      if (res.data.status === 1) {
        setCategories(res.data.data || []);
      } else {
        notifyOnFail(res.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchBlogs();
    fetchCategories();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...allBlogs];

    // Apply category filter
    if (selectedCategory !== "all") {
      console.log(typeof selectedCategory);

      filtered = filtered.filter(
        (blog) => blog?.category_id === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm?.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog?.title?.toLowerCase()?.includes(searchLower) ||
          blog?.meta_description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredBlogs(filtered);
    setTotalPages(Math.ceil(filtered.length / blogsPerPage));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [allBlogs, selectedCategory, searchTerm]);

  // Get current page blogs
  const getCurrentPageBlogs = () => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  };

  // Create pairs of blogs for layout
  const blogPairs = [];
  const currentBlogs = getCurrentPageBlogs();
  for (let i = 0; i < currentBlogs.length; i += 2) {
    blogPairs.push(currentBlogs.slice(i, i + 2));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 py-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-6">Our Latest Insights</h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Discover the latest trends, insights, and stories from our experts
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:ring-2 
                         focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="relative w-full md:w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 
                         focus:ring-emerald-500 text-left flex justify-between items-center"
              >
                <span>
                  {selectedCategory === "all"
                    ? "All Categories"
                    : categories?.find(
                        (c) => c.id.toString() === selectedCategory
                      )?.title}
                </span>
                <Filter className="w-5 h-5 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-50 transition-colors"
                    >
                      All Categories
                    </button>
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-emerald-50 transition-colors"
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-xl text-gray-600">
              No articles found matching your criteria
            </h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentPageBlogs().map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                categories={categories}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2 mt-16 mb-8"
          >
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 
                       hover:bg-emerald-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 rounded-lg border ${
                    currentPage === number
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "border-gray-200 hover:bg-emerald-50"
                  } transition-colors`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 
                       hover:bg-emerald-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
