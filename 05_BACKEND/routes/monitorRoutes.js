// External imports
const express = require("express");
const router = express.Router();

// internal imports
const monitorController = require("../controllers/monitorController");

router.get("/getResponseTime/:apiConfigId", monitorController.getRT);
router.get("/getPaylodSize/:apiConfigId", monitorController.getPS);
router.get("/throughput/:apiConfigId", monitorController.throughput);

router.get("/reqCount/:apiConfigId", monitorController.reqCount);

router.get(
  "/responseTimeStat/:apiConfigId",
  monitorController.responseTimeStat
);

router.get("/averageStats/:apiConfigId", monitorController.averageStats);

router.get(
  "/p95AndP99ResponseTime/:apiConfigId",
  monitorController.p95AndP99ResponseTime
);

module.exports = router;
