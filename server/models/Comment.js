const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Blog = require("./Blog");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 1000], // Maximum 1000 characters
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Comment,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "approved", // Change to 'pending' if you want moderation
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    createdAt: "created_at",
    updatedAt: "updated_at",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Comment;
