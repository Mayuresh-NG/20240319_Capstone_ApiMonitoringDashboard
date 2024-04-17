const mongoose = require("mongoose");

const apiConfigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  apiUrl: { type: String, required: true },
  apiKey: { type: String },
  name: { type: String, required: true },
  monitoringInterval: { type: Number, default: 30000 },
  alertThresholds: {
    responseTime: { type: Number },
    errorRate: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

const apiConfig = mongoose.model("APIConfig", apiConfigSchema);

module.exports = apiConfig;
