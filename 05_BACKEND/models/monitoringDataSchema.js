const mongoose = require("mongoose");

const monitoringDataSchema = new mongoose.Schema({
  apiConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "APIConfig",
    required: true,
  },
  timestamp: [{ type: Date }],
  responseTime: [{ type: Number }],
  status: [{ type: String }],
  errorMessage: [{ type: String }],
  throughput: [{ type: Number }],
  reqPayloadSize: [{ type: Number }],
  resPayloadSize: [{ type: Number }],
  p95ResponseTime: { type: Number },
  p99ResponseTime: { type: Number },
  requestCount: { type: Number, default: 1, required: true },
  successRate: { type: Number },
  errorRate: { type: Number },
  averagePayloadSize: { type: Number },
  failureCount: { type: Number },
  downtime: { type: Number },
  peakResponseTime: { type: Number },
  minResponseTime: { type: Number },
  averageResponseTime: { type: Number },
  userAgent: { type: String },
});

const MonitoringData = mongoose.model("MonitoringData", monitoringDataSchema);

module.exports = MonitoringData;
