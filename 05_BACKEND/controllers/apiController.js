// internal imports
const apiConfig = require("../models/apiConfigSchema");
const Alert = require("../models/alertSchema");
const mongoose = require("mongoose");

// Required libraries for sending alerts
const twilio = require("twilio");
const { accountSid, authToken, twilioNumber } = require("../utils/twilio");

// Used by SendAlert api to access twillio authorization details
const client = twilio(accountSid, authToken);

/**Handles the configuration of a new API.
 * @param {import('express').Request} req - The request object containing the API configuration data.
 * @param {import('express').Response} res - The response object used to send the result back to the client.
 * @returns {Promise<void>}
 */
const config = async (req, res) => {
  try {
    // Access decoded token payload from middleware
    const decoded = req.decoded;
    const userId = decoded.userId;
    const { apiUrl, apiKey, name, monitoringInterval, alertThresholds } =
      req.body;

    // Create a new API configuration object
    const newConfig = new apiConfig({
      userId,
      apiUrl,
      apiKey,
      name,
      monitoringInterval,
      alertThresholds,
    });

    // Save the new API configuration
    const savedConfig = await newConfig.save();

    // Send the saved configuration back to the client
    res.json(savedConfig);
  } catch (error) {
    console.error("Error saving API configuration:", error);
    // Send an error response to the client
    res.status(500).json({ error: "Failed to save API configuration" });
  }
};

/**Retrieves API configurations associated with the authenticated user.
 * @param {import('express').Request} req - The request object containing user authentication data.
 * @param {import('express').Response} res - The response object used to send the API configurations back to the client.
 * @returns {Promise<void>}
 */
const loadapi = async (req, res) => {
  try {
    // Extract user ID from decoded token
    const userId = req.decoded.userId;

    // Find API configurations associated with the user
    const configs = await apiConfig.find({ userId });

    // Send the API configurations back to the client
    res.json(configs);
  } catch (error) {
    console.error("Error fetching API configurations:", error);
    // Send an error response to the client
    res.status(500).json({ error: "Failed to fetch API configurations" });
  }
};

/**Updates an API configuration.
 * @param {import('express').Request} req - The request object containing user authentication data, API ID, and update data.
 * @param {import('express').Response} res - The response object used to send the updated API configuration back to the client.
 * @returns {Promise<void>}
 */
const updatapi = async (req, res) => {
  try {
    // Extract user ID from decoded token
    const userId = req.decoded.userId;

    // Extract API ID from request parameters
    const apiId = req.params.id;

    // Extract update data from request body
    const updateData = req.body;

    // Find the API configuration by ID and user ID, and update it
    const api = await apiConfig.findOneAndUpdate(
      { _id: apiId, userId },
      updateData,
      { new: true }
    );

    // Check if the API configuration exists
    if (!api) {
      // If not found, send a 404 response
      return res.status(404).json({ error: "API configuration not found" });
    }

    // Send the updated API configuration back to the client
    res.json(api);
  } catch (error) {
    console.error("Error updating API configuration:", error);
    // Send an error response to the client
    res.status(500).json({ error: "Failed to update API configuration" });
  }
};

/**Deletes an API configuration by ID.
 * @param {import('express').Request} req - The request object containing the API ID to delete.
 * @param {import('express').Response} res - The response object used to send the result back to the client.
 * @returns {Promise<void>}
 */
const deleteapi = async (req, res) => {
  const apiId = req.params.id;

  try {
    // Check if the API configuration exists and delete it
    const api = await apiConfig.findByIdAndDelete(apiId);

    // If the API configuration does not exist, send a 404 response
    if (!api) {
      return res.status(404).json({ error: "API configuration not found" });
    }

    // Send a success message to the client
    res.status(200).json({ message: "API configuration deleted successfully" });
  } catch (error) {
    console.error("Error deleting API configuration:", error);
    // Send an error response to the client
    res.status(500).json({ error: "Failed to delete API configuration" });
  }
};

/**Sends an alert message to the specified phone number.
 * @param {string} phoneNumber - The phone number to send the alert message to.
 * @param {string} message - The alert message to send.
 *
 * This function:
 *  1. Calls the Twilio API to send an SMS message to the provided phone number.
 *  2. Logs the message id on success.
 *  3. Logs an error on failure.
 */
const sendAlert = (phoneNumber, message) => {
  client.messages
    .create({
      body: message,
      to: phoneNumber,
      from: twilioNumber,
    })
    .then((message) =>
      console.log("Alert message sent successfully:", message.sid)
    )
    .catch((error) => console.error("Error sending alert message:", error));
};

/**Creates a new alert with the provided API configuration ID and condition.
 * @param {Object} req - The request object containing the API configuration ID and condition.
 * @param {Object} res - The response object to send the created alert.
 *
 * This function:
 *  1. Creates a new alert instance using the incoming request data.
 *  2. Saves the new alert to the database.
 *  3. Returns the created alert as a JSON object.
 */
const createAlert = async (req, res) => {
  try {
    const { userId, apiConfigId, condition } = req.body;
    const newAlert = new Alert({ userId, apiConfigId, condition });
    const savedAlert = await newAlert.save();
    res.json(savedAlert);
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ error: "Failed to create alert" });
  }
};

const getAlert = async (req, res) => {
  try {
    const userId = req.params.userid;

    // Fetch alerts and populate with corresponding apiConfig data
    const alerts = await Alert.find({ userId }).populate({
      path: "apiConfigId",
      select: "name", // Select only the 'name' property from apiConfig
    });

    if (!alerts) {
      return res.status(404).json({ message: "No alerts found for this user" });
    }

    // Respond with combined alerts and apiConfig data
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

module.exports = {
  config,
  loadapi,
  updatapi,
  deleteapi,
  sendAlert,
  createAlert,
  getAlert,
};
