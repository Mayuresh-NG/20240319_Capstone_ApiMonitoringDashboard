const MonitoringData = require("../models/monitoringDataSchema");

/** Retrieves an array of response times for the API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the response times array.
 */
const getRT =  async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the responseTime field.
    const data = await MonitoringData.findOne({ apiConfigId }, "responseTime");

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res.status(404).json({ error: "No data found for the provided API config ID" });
    }

    // Extract the response times array from the data.
    const responseTimes = data.responseTime || [];

    // Send the response times array as a JSON object.
    res.json(responseTimes);
  } catch (error) {
    // Log any error that occurs when fetching response times.
    console.error("Error fetching response times:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch response times" });
  }
};

/**Retrieves an array of response payload sizes for the API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the response payload sizes array.
 */
const getPS =  async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the resPayloadSize field.
    const data = await MonitoringData.findOne({ apiConfigId }, "resPayloadSize");

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res.status(404).json({ error: "No data found for the provided API config ID" });
    }

    // Extract the response payload sizes array from the data.
    const resPayloadSize = data.resPayloadSize || [];

    // Send the response payload sizes array as a JSON object.
    res.json(resPayloadSize);
  } catch (error) {
    // Log any error that occurs when fetching response payload sizes.
    console.error("Error fetching response payload sizes:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch response payload sizes" });
  }
};

module.exports ={
    getRT,getPS
}