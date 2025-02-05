const { Comment, User, Blog } = require("../models");

const commentController = {
  // Create new comment
  async create(req, res) {
    try {
      const { content, blogId, parentId } = req.body;
      const { authorId } = req.params;
      console.log(authorId);

      // Verify blog exists
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        return res.status(404).json({
          status: 0,
          message: "Blog post not found",
        });
      }

      // If it's a reply, verify parent comment exists
      if (parentId) {
        const parentComment = await Comment.findByPk(parentId);
        if (!parentComment) {
          return res.status(404).json({
            status: 0,
            message: "Parent comment not found",
          });
        }
      }

      const comment = await Comment.create({
        content,
        blog_id: blogId,
        parent_id: parentId || null,
        author_id: authorId,
      });

      // Fetch the created comment with author details
      const commentWithDetails = await Comment.findByPk(comment.id, {
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "name"],
          },
        ],
      });

      return res.status(201).json({
        status: 1,
        data: commentWithDetails,
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: "Error creating comment",
        error: error.message,
      });
    }
  },

  // Get comments for a blog post
  async getByBlogId(req, res) {
    try {
      const { blogId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Get only top-level comments (no parentId)
      const comments = await Comment.findAndCountAll({
        where: {
          blog_id: blogId,
          parent_id: null,
          status: "approved",
        },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "name"],
          },
          {
            model: Comment,
            as: "replies",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "name"],
              },
            ],
            where: {
              status: "approved",
            },
            required: false,
          },
        ],
        limit,
        offset,
        order: [
          ["createdAt", "DESC"],
          [{ model: Comment, as: "replies" }, "createdAt", "ASC"],
        ],
      });

      return res.status(200).json({
        status: 1,
        data: comments.rows,
        pagination: {
          total: comments.count,
          page,
          totalPages: Math.ceil(comments.count / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: "Error fetching comments",
        error: error.message,
      });
    }
  },

  // Update comment
  async update(req, res) {
    try {
      const { id, authorId } = req.params;
      const { content } = req.body;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({
          status: 0,
          message: "Comment not found",
        });
      }

      // Check if user is the author
      if (comment.author_id !== authorId) {
        return res.status(403).json({
          status: 0,
          message: "Unauthorized to update this comment",
        });
      }

      const updatedComment = await comment.update({
        content,
      });

      return res.status(200).json({
        status: 1,
        data: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: "Error updating comment",
        error: error.message,
      });
    }
  },

  // Delete comment
  async delete(req, res) {
    try {
      const { id, authorId } = req.params;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({
          status: 0,
          message: "Comment not found",
        });
      }

      // Check if user is the author or blog owner
      if (comment.author_id !== authorId) {
        // Check if user is blog owner
        const blog = await Blog.findByPk(comment.blog_id);
        if (blog.author_id !== authorId) {
          return res.status(403).json({
            status: 0,
            message: "Unauthorized to delete this comment",
          });
        }
      }

      await comment.destroy();

      return res.status(200).json({
        status: 1,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: "Error deleting comment",
        error: error.message,
      });
    }
  },

  // Moderate comment (for admin/moderators)
  async moderate(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({
          status: 0,
          message: "Comment not found",
        });
      }

      // Here you should add a check if the user is admin/moderator
      // This is just a placeholder - implement your own logic
      if (!req.user.isAdmin) {
        return res.status(403).json({
          status: 0,
          message: "Unauthorized to moderate comments",
        });
      }

      const updatedComment = await comment.update({
        status,
      });

      return res.status(200).json({
        status: 1,
        data: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: "Error moderating comment",
        error: error.message,
      });
    }
  },
};

module.exports = commentController;
