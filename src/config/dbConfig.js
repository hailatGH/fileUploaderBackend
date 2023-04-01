const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3306,
  USER: "root",
  PASSWORD: process.env.PASSWORD || "",
  DATABASE: process.env.DATABASE || "fileUploader",
  DIALECT: process.env.DIALECT || "mysql",
};
