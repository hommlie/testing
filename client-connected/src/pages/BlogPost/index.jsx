import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2, MessageSquare, Edit2, Trash2 } from "lucide-react";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import axios from "axios";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import RelatedBlogs from "./RelatedBlogs";
import { Helmet } from "react-helmet";

// ================= Comment Component =================
const Comment = React.memo(
  ({
    comment,
    level = 0,
    user,
    onReply,
    onEdit,
    onDelete,
    editingComment,
    setEditingComment,
    replyingTo,
    setReplyingTo,
  }) => {
    const paddingLeft = level * 24; // Better control for nesting

    return (
      <div className="mt-6" style={{ paddingLeft }}>
        <div className="bg-white rounded-xl p-5 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                {comment.author.name}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>

            {comment.author_id === user?.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingComment(comment)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {editingComment?.id === comment.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onEdit(comment.id, editingComment.content);
              }}
              className="mt-2"
            >
              <textarea
                value={editingComment.content}
                onChange={(e) =>
                  setEditingComment({
                    ...editingComment,
                    content: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-24"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingComment(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment.content}
            </p>
          )}

          <button
            onClick={() => setReplyingTo({ id: comment.id, newReply: "" })}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4" />
            Reply
          </button>

          {replyingTo?.id === comment.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onReply(comment.id, replyingTo.newReply);
              }}
              className="mt-3"
            >
              <textarea
                value={replyingTo.newReply}
                onChange={(e) =>
                  setReplyingTo({
                    ...replyingTo,
                    newReply: e.target.value,
                  })
                }
                placeholder="Write a reply..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-20 text-sm"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {comment.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              level={level + 1}
              user={user}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          ))}
        </div>
      </div>
    );
  }
);

// ================= BlogPost Component =================
const BlogPost = () => {
  const { slug } = useParams();
  const { user } = useCont();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const notify = useToast();
  const notifyOnSuccess = (success) => notify(success, "success");
  const notifyOnFail = (error) => notify(error, "error");

  const organizeComments = useCallback((commentsArray) => {
    const commentMap = {};
    const rootComments = [];

    commentsArray.forEach((comment) => {
      commentMap[comment.id] = {
        ...comment,
        replies: [],
      };
    });

    commentsArray.forEach((comment) => {
      if (comment.parent_id === null) {
        rootComments.push(commentMap[comment.id]);
      } else {
        const parentComment = commentMap[comment.parent_id];
        if (parentComment) {
          parentComment.replies.push(commentMap[comment.id]);
        }
      }
    });

    return rootComments;
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${config.API_URL}/api/blogs/getbyslug/${slug}`
      );
      if (res.data.status === 1) {
        setBlog(res.data.data);
        setRelatedBlogs(res.data.data.relatedBlogs || []);
        const organizedComments = organizeComments(
          res.data.data?.Comments || []
        );
        setComments(organizedComments);
      } else {
        notifyOnFail(res.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/404");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [slug, navigate]);

  const handleCommentSubmit = async (parentId = null, content = newComment) => {
    if (!user || !user.id) {
      setIsLoginOpen(true);
      return null;
    }

    try {
      const res = await axios.post(
        `${config.API_URL}/api/comments/create/${user.id}`,
        {
          content,
          blogId: blog.id,
          parentId,
        }
      );

      if (res.data.status === 1) {
        fetchData();
        setNewComment("");
        setReplyingTo(null);
        notifyOnSuccess("Comment posted successfully!");
      }
    } catch (error) {
      notifyOnFail("Failed to post comment");
    }
  };

  const handleCommentEdit = async (commentId, content) => {
    if (!user || !user.id) {
      setIsLoginOpen(true);
      return null;
    }

    try {
      const res = await axios.put(
        `${config.API_URL}/api/comments/update/${commentId}/${user.id}`,
        { content }
      );

      if (res.data.status === 1) {
        fetchData();
        setEditingComment(null);
        notifyOnSuccess("Comment updated successfully!");
      }
    } catch (error) {
      notifyOnFail("Failed to update comment");
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!user || !user.id) {
      setIsLoginOpen(true);
      return null;
    }

    try {
      const res = await axios.delete(
        `${config.API_URL}/api/comments/delete/${commentId}/${user.id}`
      );

      if (res.data.status === 1) {
        fetchData();
        notifyOnSuccess("Comment deleted successfully!");
      }
    } catch (error) {
      notifyOnFail("Failed to delete comment");
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      email: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setShareMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!blog) return null;

  const generateCanonicalUrl = () => {
    const baseUrl = config.VITE_BASE_URL || "https://www.hommlie.com";
    let path = `/blog/${slug}`;
    return `${baseUrl}${path}`;
  };


  return (
    <div className="min-h-screen max-w-7xl mx-auto font-sans">
      <Helmet>
        <title>{blog?.meta_title || "Category Page"}</title>
        <meta name="description" content={blog?.meta_description || ""} />
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>

      {/* Breadcrumbs - Mobile Responsive */}
      <nav
        className="ml-4 sm:ml-0 sm:-ml-4 px-2 sm:px-8 lg:px-16 py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        aria-label="Breadcrumb"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <span
          className="hover:underline cursor-pointer text-emerald-600 min-w-fit"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <span className="mx-1">/</span>
        <span
          className="hover:underline cursor-pointer text-emerald-600 min-w-fit"
          onClick={() => navigate("/blogs")}
        >
          Blogs
        </span>
        <span className="mx-1">/</span>
        <span
          className="text-gray-700 font-medium truncate max-w-[120px] sm:max-w-xs min-w-0"
          title={blog.title}
        >
          {blog.title}
        </span>
      </nav>

      <div className="">
        <img
          src={blog.featured_image || "/api/placeholder/1920/500"}
          alt={blog.title}
          className="w-[100%] sm:w-[80%] h-[60vh] object-cover object-center sm:ml-12"
          style={{ minHeight: '50%', minWidth: '92%' }}
        />
        {/* <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-2 sm:px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-xl xs:text-2xl sm:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-xs xs:text-sm sm:text-lg text-gray-200">
              {blog.meta_description}
            </p>
          </div>
        </div> */}
      </div>

      {/* Blog Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        <h1 className="sm:-ml-2 -ml-1 text-md xs:text-2xl sm:text-2xl font-bold mb-2 sm:mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-between text-sm">
          
          <div>
            <span className="capitalize text-emerald-600 font-medium">
              {blog.BlogCategory?.title}
            </span>
            <span className="mx-2">•</span>
            <span className="text-gray-500">
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>

            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                {["twitter", "facebook", "linkedin", "email"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleShare(p)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm capitalize"
                  >
                    Share on {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>


        {/* Blog Content - Full Width Responsive */}
      <div className="">
        <div
          className="max-w-screen-2xl mx-auto text-md leading-8 tracking-wide text-justify space-y-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

        {/* Comments */}
        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Comments
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-24 text-sm"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm h-fit"
              >
                Post
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                onReply={handleCommentSubmit}
                onEdit={handleCommentEdit}
                onDelete={handleCommentDelete}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
              />
            ))}
          </div>
        </div>

        {/* Related Blogs */}
        <RelatedBlogs blogs={relatedBlogs} />

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate(`${config.VITE_BASE_URL}/blogs`)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>

      <LoginSignup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default BlogPost;
