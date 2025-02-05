import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import axios from "axios";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const notify = useToast();
  const notifyOnSuccess = (success) => notify(success, "success");
  const notifyOnFail = (error) => notify(error, "error");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${config.API_URL}/api/blogs/getbyslug/${slug}`
        );
        if (res.data.status === 1) {
          setBlog(res.data.data);
        } else {
          notifyOnFail(res.data.message);
          return null;
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B1F40]"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white max-w-7xl">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src={blog.featured_image || "/api/placeholder/1920/500"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-italiana mb-4">{blog.title}</h1>
            <p className="text-xl">{blog.meta_description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#6B1F40]">{blog.category?.name}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-500">
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {/* Add social share buttons here if needed */}
            </div>
          </div>

          {/* Blog Content */}
          <div className="ck-content">
            <div
              className="space-y-4 prose prose-sm sm:prose lg:prose-base max-w-none"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={() => navigate(`${config.VITE_BASE_WEBSITE_URL}/blogs`)}
            className="px-6 py-2 bg-[#6B1F40] text-white hover:bg-[#5a1935] transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
