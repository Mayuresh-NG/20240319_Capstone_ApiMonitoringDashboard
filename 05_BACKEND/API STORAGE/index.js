const express = require("express");
const axios = require("axios");
const MonitoringData = require("../models/monitoringDataSchema");
const APIConfig = require("../models/apiConfigSchema");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://mayureshngorantiwar:XkHynoxmktHsKefm@cluster0.qezkejq.mongodb.net/API_MONITORING";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to monitor the API
const monitorAPI = async (apiConfigId, userAgent) => {
  try {
    const apiConfig = await APIConfig.findById(apiConfigId);
    if (!apiConfig) {
      console.log("API configuration not found");
      return;
    }

    let mdc = await MonitoringData.findOne({ apiConfigId });

    if (!mdc) {
      // If no MonitoringData document exists, create a new one
      mdc = new MonitoringData({
        apiConfigId: apiConfig._id,
        requestCount: 1, // Set requestCount to 1 for the first call
      });
    } else {
      mdc.requestCount += 1; // Increment requestCount for subsequent calls
    }

    await mdc.save(); // Save the MonitoringData document

    const startTime = Date.now();
    let response,
      errorMessage = "";

    try {
      response = await axios.get(apiConfig.apiUrl, {
        headers: {
          "User-Agent": userAgent,
        },
      });
    } catch (error) {
      errorMessage = error.message;
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const reqPayloadSize = 0;
    const resPayloadSize = JSON.stringify(response?.data)?.length || 0;

    const requestCount = mdc.requestCount;
    const failureCount = errorMessage ? 1 : 0;
    const downtime = failureCount > 0 ? responseTime : 0;
    const peakResponseTime = responseTime;
    const minResponseTime = responseTime;
    const successRate = ((requestCount - failureCount) / requestCount) * 100;
    const errorRate = 100 - successRate;
    const throughput = requestCount / responseTime;
    let averagePayloadSize = resPayloadSize / requestCount;
    let p95ResponseTime = 0;
    let p99ResponseTime = 0;
    let averageResponseTime = responseTime / requestCount;

    const monitoringData = new MonitoringData({
      apiConfigId: apiConfig._id,
      timestamp: new Date(),
      responseTime,
      status: response ? response.status : "Error",
      errorMessage,
      reqPayloadSize,
      resPayloadSize,
      throughput,
      successRate,
      errorRate,
      averagePayloadSize,
      p95ResponseTime,
      p99ResponseTime,
      requestCount,
      failureCount,
      downtime,
      peakResponseTime,
      minResponseTime,
      averageResponseTime,
      userAgent,
    });

    await monitoringData.save();

    console.log("API monitoring data collected successfully");
  } catch (error) {
    console.error("Failed to monitor API:", error);
  }
};

// Example endpoint to trigger monitoring of a specific API
app.get("/monitor-api/:apiConfigId", async (req, res) => {
  try {
    const apiConfigId = req.params.apiConfigId;
    const userAgent = req.headers["user-agent"];
    // Trigger API monitoring immediately
    await monitorAPI(apiConfigId, userAgent);
    // Set interval to trigger API monitoring every 5 minutes (adjust interval as needed)
    setInterval(async () => {
      await monitorAPI(apiConfigId);
    }, 5000); // Interval in milliseconds (5 minutes)
    res.send("API monitoring started");
  } catch (error) {
    console.error("Failed to start API monitoring:", error);
    res.status(500).send("Error starting API monitoring");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
