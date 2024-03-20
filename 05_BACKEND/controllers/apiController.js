// internal imports
const apiConfig = require("../models/apiConfigSchema"); // Adjust the path as needed

const config = async (req, res) => {
  try {
    const decoded = req.decoded; // Access decoded token payload from middleware
    const userId = decoded.userId;
    const { apiUrl, apiKey, name, monitoringInterval, alertThresholds } =
      req.body;

    // Validate and sanitize input here if needed

    const newConfig = new apiConfig({
      userId,
      apiUrl,
      apiKey,
      name,
      monitoringInterval,
      alertThresholds,
    });

    const savedConfig = await newConfig.save();
    res.json(savedConfig);
  } catch (error) {
    console.error("Error saving API configuration:", error);
    res.status(500).json({ error: "Failed to save API configuration" });
  }
};

const loadapi = async (req, res) => {
  try {
    const userId = req.decoded.userId; // Extract user ID from decoded token
    const configs = await apiConfig.find({ userId });

    res.json(configs);
  } catch (error) {
    console.error("Error fetching API configurations:", error);
    res.status(500).json({ error: "Failed to fetch API configurations" });
  }
};

const updatapi = async (req, res) => {
  try {
    const userId = req.decoded.userId; // Extract user ID from decoded token
    const apiId = req.params.id;
    const updateData = req.body;

    // Find the API configuration by ID and user ID
    const api = await apiConfig.findOneAndUpdate(
      { _id: apiId, userId },
      updateData,
      { new: true }
    );

    if (!api) {
      return res.status(404).json({ error: "API configuration not found" });
    }

    res.json(api);
  } catch (error) {
    console.error("Error updating API configuration:", error);
    res.status(500).json({ error: "Failed to update API configuration" });
  }
};

const deleteapi = async (req, res) => {
  const apiId = req.params.id;

  try {
    // Check if the API configuration exists
    const api = await apiConfig.findByIdAndDelete(apiId);
    if (!api) {
      return res.status(404).json({ error: "API configuration not found" });
    }

    res.status(200).json({ message: "API configuration deleted successfully" });
  } catch (error) {
    console.error("Error deleting API configuration:", error);
    res.status(500).json({ error: "Failed to delete API configuration" });
  }
};

module.exports = {
  config,
  loadapi,
  updatapi,
  deleteapi,
};
