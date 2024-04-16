const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Invalid mobile number format'], // Enforces 10-digit number pattern
  },
  createdAt: { type: Date, default: Date.now },
  apiConfigurations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "APIConfig" },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
