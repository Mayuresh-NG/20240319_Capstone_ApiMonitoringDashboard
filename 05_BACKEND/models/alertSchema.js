const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  apiConfigId: {
    type: String,
    ref: "APIConfig",
    required: true,
  },
  condition: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
