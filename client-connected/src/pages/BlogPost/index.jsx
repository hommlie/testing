import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2, MessageSquare, Edit2, Trash2, Send, X } from "lucide-react";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import axios from "axios";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import RelatedBlogs from "./RelatedBlogs";

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
    const paddingLeft = level * 2;

    return (
      <div className={`pl-${paddingLeft} mt-4`}>
        <div className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">{comment.author.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>

            {comment.author_id === user?.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingComment(comment)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-24"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingComment(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700">{comment.content}</p>
          )}

          <button
            onClick={() => setReplyingTo({ id: comment.id, newReply: "" })}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
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
              className="mt-4"
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-24"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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
    if (!user && !user.length) {
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
    if (!user && !user.length) {
      setIsLoginOpen(true);
      return null;
    }

    try {
      const res = await axios.put(
        `${config.API_URL}/api/comments/update/${commentId}/${user.id}`,
        {
          content,
        }
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
    if (!user && !user.length) {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B1F40]"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <main className="min-h-screen">
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="capitalize text-emerald-500">
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
                <Share2 className="w-5 h-5" />
              </button>

              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare("email")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Share via Email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ck-content">
          <div
            className="space-y-4 prose prose-sm sm:prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>

          <form onSubmit={handleCommentSubmit} className="mb-12">
            <div className="flex gap-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-24"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 h-fit bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>

          <div className="space-y-8">
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

        <RelatedBlogs blogs={relatedBlogs} />

        <div className="mt-12">
          <button
            onClick={() => navigate(`${config.VITE_BASE_URL}/blogs`)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>

      <LoginSignup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
};

export default BlogPost;
