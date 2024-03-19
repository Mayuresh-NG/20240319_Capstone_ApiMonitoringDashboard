// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Define routes
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB asynchronously
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Use the routes in your app
app.use("/users", userRoutes);

// Start the server after connecting to MongoDB
const startServer = async () => {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Call the asynchronous functions
connectToMongoDB().then(startServer);
