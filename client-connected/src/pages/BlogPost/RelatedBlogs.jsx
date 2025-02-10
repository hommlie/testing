import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import config from "../../config/config";

const RelatedBlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
  >
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      <img
        src={blog.featured_image || "/api/placeholder/400/300"}
        alt={blog.title}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6">
      <span className="mb-2 inline-block text-sm font-medium text-emerald-500">
        {blog.BlogCategory?.title}
      </span>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">
        {blog.title}
      </h3>
      <p className="mb-4 text-gray-600 line-clamp-2">{blog.meta_description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600"
          onClick={() =>
            (window.location.href = `${config.VITE_BASE_URL}/blog/${blog.slug}`)
          }
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const RelatedBlogs = ({ blogs }) => {
  if (!blogs?.length) return null;

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
        <p className="mt-2 text-gray-600">
          Discover more articles you might like
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <RelatedBlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
