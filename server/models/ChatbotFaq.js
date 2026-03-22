const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ChatbotFaq extends Model {}

ChatbotFaq.init(
  {
    questions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answers: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ChatbotFaq",
    tableName: "chatbot_faqs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ChatbotFaq;
