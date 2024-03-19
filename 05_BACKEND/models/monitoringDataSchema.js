const mongoose = require("mongoose");

const monitoringDataSchema = new mongoose.Schema({
  apiConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "APIConfig",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  responseTime: { type: Number, required: true }, // in milliseconds
  status: { type: String, required: true },
  errorMessage: { type: String },
  throughput: { type: Number }, // Requests per second
  successRate: { type: Number }, // Percentage of successful requests
  errorRate: { type: Number }, // Percentage of failed requests
  averagePayloadSize: { type: Number }, // Average size of the response payload in bytes
  p95ResponseTime: { type: Number }, // 95th percentile response time in milliseconds
  p99ResponseTime: { type: Number }, // 99th percentile response time in milliseconds
  // New statistics
  requestCount: { type: Number }, // Total number of requests during the monitoring interval
  failureCount: { type: Number }, // Total number of failed requests during the monitoring interval
  downtime: { type: Number }, // Total downtime in milliseconds during the monitoring interval
  peakResponseTime: { type: Number }, // Maximum response time in milliseconds during the monitoring interval
  minResponseTime: { type: Number }, // Minimum response time in milliseconds during the monitoring interval
  averageResponseTime: { type: Number }, // Average response time in milliseconds during the monitoring interval
  // Any other data you want to track
});

const MonitoringData = mongoose.model("MonitoringData", monitoringDataSchema);
module.exports = MonitoringData;
