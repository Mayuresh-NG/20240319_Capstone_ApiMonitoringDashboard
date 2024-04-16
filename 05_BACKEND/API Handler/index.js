// exteranl imports
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Schemas
const MonitoringData = require("../models/monitoringDataSchema");
const APIConfig = require("../models/apiConfigSchema");
const Alert = require("../models/alertSchema");

// controller import
const { sendAlert } = require("../controllers/apiController");

// start the app
const app = express();

// connecting to mongodb asynchronously
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mayureshngorantiwar:XkHynoxmktHsKefm@cluster0.qezkejq.mongodb.net/API_MONITORING"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Function to monitor the API
const monitorAPI = async (apiConfigId, userAgent) => {
  try {
    const apiConfig = await APIConfig.findById(apiConfigId);
    if (!apiConfig) {
      console.log("API configuration not found");
      return;
    }

    let mdc = await MonitoringData.findOne({ apiConfigId });
    console.log(mdc);

    if (!mdc) {
      // If no MonitoringData document exists, create a new one
      mdc = new MonitoringData({
        apiConfigId: apiConfig._id,
      });
    }

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

    // Update arrays with new data
    mdc.timestamp.push(new Date());

    const { condition: alertresponseTime } =
      (await Alert.findOne({ apiConfigId })) || {};
    
    if (responseTime > alertresponseTime) {
      mdc.responseTime.push(responseTime);
      const message = `Response time exceeded threshold: ${responseTime} ms`;
      sendAlert("+918999145269", message);
    } else mdc.responseTime.push(responseTime);

    mdc.status.push(response ? response.status : "Error");
    mdc.errorMessage.push(errorMessage);
    mdc.reqPayloadSize.push(reqPayloadSize);
    mdc.resPayloadSize.push(resPayloadSize);

    // Calculate and update aggregate values
    const requestCount = mdc.requestCount + 1;
    mdc.throughput.push(requestCount / (5 * 60));
    const peakResponseTime = Math.max(...mdc.responseTime);
    const minResponseTime = Math.min(...mdc.responseTime);
    const averagePayloadSize =
      mdc.resPayloadSize.reduce((a, b) => a + b, 0) / mdc.requestCount;
    const averageResponseTime =
      mdc.responseTime.reduce((a, b) => a + b, 0) / mdc.requestCount;
    const p95ResponseTime = calculatePercentile(mdc.responseTime, 95);
    const p99ResponseTime = calculatePercentile(mdc.responseTime, 99);

    // Update aggregate fields
    mdc.requestCount = requestCount;
    mdc.peakResponseTime = peakResponseTime;
    mdc.minResponseTime = minResponseTime;
    mdc.averagePayloadSize = averagePayloadSize;
    mdc.averageResponseTime = averageResponseTime;
    mdc.p95ResponseTime = p95ResponseTime;
    mdc.p99ResponseTime = p99ResponseTime;

    await mdc.save();

    console.log("API monitoring data collected successfully");
  } catch (error) {
    console.error("Failed to monitor API:", error);
  }
};

// Function to calculate percentile
const calculatePercentile = (arr, percentile) => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * arr.length);
  return sortedArr[index - 1];
};

let intervalId;

// Example endpoint to trigger monitoring of a specific API
app.post("/monitor-api/:apiConfigId/", async (req, res) => {
  try {
    const apiConfigId = req.params.apiConfigId;
    const userAgent = req.headers["user-agent"];
    const interval = parseInt(req.headers["monitoring-interval"]);
    console.log(interval);
    // Trigger API monitoring immediately
    await monitorAPI(apiConfigId, userAgent);
    // Set interval to trigger API monitoring every 5 minutes (adjust interval as needed)
    intervalId = setInterval(async () => {
      await monitorAPI(apiConfigId, userAgent);
    }, interval); // Interval in milliseconds (5 minutes)
  } catch (error) {
    console.error("Failed to start API monitoring:", error);
    res.status(500).send("Error starting API monitoring");
  }
});

app.post("/stop-monitoring", (req, res) => {
  try {
    // Clear the interval using the interval ID
    clearInterval(intervalId);
    console.log("API monitoring stopped");
    res.status(200).send("API monitoring stopped successfully");
  } catch (error) {
    console.error("Failed to stop API monitoring:", error);
    res.status(500).send("Error stopping API monitoring");
  }
});

const startServer = async () => {
  const port = 8000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Call the asynchronous functions
connectToMongoDB().then(startServer);
