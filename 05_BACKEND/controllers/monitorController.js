// Schema
const MonitoringData = require("../models/monitoringDataSchema");

/**Retrieves an array of response times for the API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the response times array.
 */
const getRT = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the responseTime field.
    const data = await MonitoringData.findOne({ apiConfigId }, "responseTime");

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
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
const getPS = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the resPayloadSize field.
    const data = await MonitoringData.findOne(
      { apiConfigId },
      "resPayloadSize"
    );

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
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

/**Retrieves an array of throughput values for the API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the throughput values array.
 *
 * This API retrieves an array of throughput values for a given API configuration ID. 
 * If the API configuration ID is not found, it returns a 404 status code
 * with a message "No data found for the provided API config ID".
 *
 */
const throughput = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the resPayloadSize field.
    const data = await MonitoringData.findOne({ apiConfigId }, "throughput");

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
    }

    // Extract the response payload sizes array from the data.
    const throughput = data.throughput || [];

    // Send the response payload sizes array as a JSON object.
    res.json(throughput);
  } catch (error) {
    // Log any error that occurs when fetching response payload sizes.
    console.error("Error fetching throughput:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch throughput" });
  }
};

/**Retrieves an array of request count values for the API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the request count values array.
 *
 * This API retrieves an array of request count values for a given API configuration ID. 
 * If the API configuration ID is not found, it returns a 404 status code
 * with a message "No data found for the provided API config ID".
 */
const reqCount = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the resPayloadSize field.
    const data = await MonitoringData.findOne({ apiConfigId }, "requestCount");

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
    }

    // Extract the response payload sizes array from the data.
    const requestCount = data.requestCount || [];

    // Send the response payload sizes array as a JSON object.
    res.json(requestCount);
  } catch (error) {
    // Log any error that occurs when fetching response payload sizes.
    console.error("Error fetching requestCount:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch requestCount" });
  }
};

/**Retrieves the peak and minimum response times for the provided API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the response times as an object.
 *
 * This API retrieves the peak and minimum response times for the given API configuration ID. 
 * If the API configuration ID is not found, it returns a 404 status code
 * with a message "No data found for the provided API config ID".
 *
 */
const responseTimeStat = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the peakResponseTime and minResponseTime fields.
    const data = await MonitoringData.findOne(
      { apiConfigId },
      "peakResponseTime minResponseTime"
    );

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
    }

    // Extract the peakResponseTime and minResponseTime from the data.
    const { peakResponseTime, minResponseTime } = data;

    // Send the response with both peakResponseTime and minResponseTime.
    res.json({ peakResponseTime, minResponseTime });
  } catch (error) {
    // Log any error that occurs when fetching response times.
    console.error("Error fetching response times:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch response times" });
  }
};

/**Retrieves the average payload size and response time for the provided API configuration ID.
 * @param {Object} req - Request object containing the API configuration ID.
 * @param {Object} res - Response object to send the average stats as an object.
 *
 * This API retrieves the average payload size and response time for the provided API configuration ID. 
 * If the API configuration ID is not found, it returns a 404 status code
 * with a message "No data found for the provided API config ID".
 */
const averageStats = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID,
    // and project only the required fields.
    const data = await MonitoringData.findOne(
      { apiConfigId },
      "averagePayloadSize averageResponseTime"
    );

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found for the provided API config ID" });
    }

    // Extract the required fields from the data.
    const { averagePayloadSize, averageResponseTime } = data;

    // Send the response with both average payload size and average response time.
    res.json({ averagePayloadSize, averageResponseTime });
  } catch (error) {
    // Log any error that occurs when fetching the data.
    console.error("Error fetching average stats:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch average stats" });
  }
};

/**Retrieves p95 and p99 response times for the provided API configuration ID.
 * @param {Object} req - Request object containing API configuration ID.
 * @param {Object} res - Response object to send the p95 and p99 response times.
 *
 * This API retrieves p95 and p99 response times for the provided API configuration ID. 
 * If the API configuration ID is not found, it returns a 404 status code
 * with a message "No data found for the provided API config ID".
 */
const p95AndP99ResponseTime = async (req, res) => {
  try {
    // Get the API configuration ID from the request parameters.
    const apiConfigId = req.params.apiConfigId;

    // Find the data with the specified API configuration ID.
    const data = await MonitoringData.findOne({ apiConfigId });

    // If no data is found for the provided API configuration ID,
    // return a 404 status code with an appropriate message.
    if (!data) {
      return res.status(404).json({ error: "No data found for the provided API config ID" });
    }

    // Extract the p95 and p99 response times from the data.
    const p95ResponseTime = data.p95ResponseTime || [];
    const p99ResponseTime = data.p99ResponseTime || [];

    // Send the response as a JSON object containing both p95 and p99 response times.
    res.json({ p95ResponseTime, p99ResponseTime });
  } catch (error) {
    // Log any error that occurs when fetching response times.
    console.error("Error fetching p95 and p99 Response Times:", error);

    // Send a 500 status code with a generic error message.
    res.status(500).json({ error: "Failed to fetch p95 and p99 Response Times" });
  }
};

module.exports = {
  getRT,
  getPS,
  throughput,
  reqCount,
  responseTimeStat,
  averageStats,
  p95AndP99ResponseTime
};
