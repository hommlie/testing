const { Blog, User, Comment, BlogCategory } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/connection");

const storagebaseUrl = process.env.apiUrl;

const blogController = {
  async getAllPublished(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;

      const blogs = await Blog.findAll({
        attributes: [
          "id",
          "title",
          "content",
          "slug",
          "meta_title",
          "meta_description",
          [
            sequelize.literal(
              `CONCAT('${storagebaseUrl}/storage/app/public/images/blogs/', featured_image)`
            ),
            "featured_image",
          ],
        ],
        include: [
          {
            model: BlogCategory,
          },
        ],
        where: {
          status: "published",
        },
        // limit,
        // offset,
        order: [["created_at", "DESC"]],
      });

      return res.status(200).json({
        status: 1,
        message: "Blog posts fetched successfully",
        data: blogs,
        // pagination: {
        //   total: blogs.count,
        //   page,
        //   totalPages: Math.ceil(blogs.count / limit)
        // }
      });
    } catch (error) {
      return res.status(200).json({
        status: 0,
        message: "Error fetching blog posts",
        error: error.message,
      });
    }
  },

  // Get single blog post by slug
  async getBySlug(req, res) {
    try {
      const blog = await Blog.findOne({
        attributes: [
          "id",
          "title",
          "content",
          "slug",
          "meta_title",
          "meta_description",
          "category_id",
          [
            sequelize.literal(
              `CONCAT('${storagebaseUrl}/storage/app/public/images/blogs/', featured_image)`
            ),
            "featured_image",
          ],
        ],
        where: { slug: req.params.slug },
        include: [
          {
            model: Comment,
            // as: 'comments',
            include: [
              {
                model: User,
                // as: 'author',
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: BlogCategory,
          },
        ],
      });

      if (!blog) {
        return res.status(200).json({
          status: 0,
          message: "Blog post not found",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Blog post fetched successfully",
        data: blog,
      });
    } catch (error) {
      return res.status(200).json({
        status: 0,
        message: "Error fetching blog post",
        error: error.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const blog = await Blog.findOne({
        attributes: [
          "id",
          "title",
          "content",
          "slug",
          "meta_title",
          "meta_description",
          "category_id",
          [
            sequelize.literal(
              `CONCAT('${storagebaseUrl}/storage/app/public/images/blogs/', featured_image)`
            ),
            "featured_image",
          ],
        ],
        where: { id: req.params.id },
        include: [
          {
            model: Comment,
            // as: 'comments',
            include: [
              {
                model: User,
                // as: 'author',
                attributes: ["id", "first_name"],
              },
            ],
          },
          {
            model: BlogCategory,
          },
        ],
      });

      if (!blog) {
        return res.status(200).json({
          status: 0,
          message: "Blog post not found",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Blog post fetched successfully",
        data: blog,
      });
    } catch (error) {
      return res.status(200).json({
        status: 0,
        message: "Error fetching blog post",
        error: error.message,
      });
    }
  },

  async getAllBlogCategories(req, res) {
    try {
      const categories = await BlogCategory.findAll();
      res.status(200).json({
        status: 1,
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(200).json({
        status: 0,
        message: "Error fetching blog categories",
        error: error.message,
      });
    }
  },
};

module.exports = blogController;
