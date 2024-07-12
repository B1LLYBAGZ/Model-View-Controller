const express = require("express");
const dotenv = require("dotenv");
const db = require("./models"); // Import the db object
const routes = require("./controllers"); // Import the routes

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 3001;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
