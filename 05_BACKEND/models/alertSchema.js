const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apiConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "APIConfig",
    required: true,
  },
  message: { type: String, required: true },
  condition: { type: String, required: true }, // e.g., "responseTime > 5000"
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
