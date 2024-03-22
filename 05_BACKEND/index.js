// Import required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Define routes
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const monitorRoutes = require("./routes/monitorRoutes");

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
app.use("/api", apiRoutes);
app.use("/monitor-data",monitorRoutes)

// Start the server after connecting to MongoDB
const startServer = async () => {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Call the asynchronous functions
connectToMongoDB().then(startServer);
