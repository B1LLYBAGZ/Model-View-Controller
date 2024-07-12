const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const userSeedData = require("./userSeed.json");
const postSeedData = require("./postSeed.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postSeedData, {
    returning: true,
  });

  console.log("Database seeded successfully!");
  process.exit(0);
};

seedDatabase();
