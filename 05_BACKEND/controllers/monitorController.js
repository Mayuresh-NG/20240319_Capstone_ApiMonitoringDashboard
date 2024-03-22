const MonitoringData = require("../models/monitoringDataSchema");

const getRT =  async (req, res) => {
  try {
    const apiConfigId = req.params.apiConfigId;
    const data = await MonitoringData.findOne({ apiConfigId }, "responseTime");
    if (!data) {
      return res.status(404).json({ error: "No data found for the provided API config ID" });
    }
    const responseTimes = data.responseTime || [];
    res.json(responseTimes);
  } catch (error) {
    console.error("Error fetching response times:", error);
    res.status(500).json({ error: "Failed to fetch response times" });
  }
};

module.exports ={
    getRT
}