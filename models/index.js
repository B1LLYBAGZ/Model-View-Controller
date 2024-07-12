const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

// Define associations
User.hasMany(Post, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "authorId",
  as: "postAuthor", // Updated alias to avoid naming collision
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "commentAuthor", // Updated alias to avoid naming collision
});

const db = {
  Post,
  User,
  Comment,
  sequelize,
  Sequelize,
};

// Sync all models with the database in the correct order
const syncDb = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database & tables created!");
};

syncDb();

module.exports = db;
