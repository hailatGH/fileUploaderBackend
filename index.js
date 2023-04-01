// Main imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Custom file imports
const db = require("./src/models");
const initRoutes = require("./src/routes");

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// IIFE to sync db tables
(async () => await db.sequelize.sync())();

// Middlewares
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
initRoutes(app);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
