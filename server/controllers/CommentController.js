const { Comment, User, Blog } = require("../models");

const commentController = {
  // Create new comment
  async create(req, res) {
    try {
      const { content, blogId, parentId } = req.body;

      // Verify blog exists
      const blog = await Blog.findByPk(blogId);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found",
        });
      }

      // If it's a reply, verify parent comment exists
      if (parentId) {
        const parentComment = await Comment.findByPk(parentId);
        if (!parentComment) {
          return res.status(404).json({
            success: false,
            message: "Parent comment not found",
          });
        }
      }

      const comment = await Comment.create({
        content,
        blogId,
        parentId: parentId || null,
        authorId: req.params.authorId,
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
        success: true,
        data: commentWithDetails,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
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
          blogId,
          parentId: null,
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
        success: true,
        data: comments.rows,
        pagination: {
          total: comments.count,
          page,
          totalPages: Math.ceil(comments.count / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
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
          success: false,
          message: "Comment not found",
        });
      }

      // Check if user is the author
      if (comment.authorId !== authorId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this comment",
        });
      }

      const updatedComment = await comment.update({
        content,
      });

      return res.status(200).json({
        success: true,
        data: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
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
          success: false,
          message: "Comment not found",
        });
      }

      // Check if user is the author or blog owner
      if (comment.authorId !== authorId) {
        // Check if user is blog owner
        const blog = await Blog.findByPk(comment.blogId);
        if (blog.authorId !== authorId) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized to delete this comment",
          });
        }
      }

      await comment.destroy();

      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
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
          success: false,
          message: "Comment not found",
        });
      }

      // Here you should add a check if the user is admin/moderator
      // This is just a placeholder - implement your own logic
      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to moderate comments",
        });
      }

      const updatedComment = await comment.update({
        status,
      });

      return res.status(200).json({
        success: true,
        data: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error moderating comment",
        error: error.message,
      });
    }
  },
};

module.exports = commentController;
