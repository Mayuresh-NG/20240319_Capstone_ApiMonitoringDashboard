const express = require('express');
const router = express.Router();

// internal imports
const monitorController= require("../controllers/monitorController");

router.get('/getResponseTime/:apiConfigId', monitorController.getRT);
router.get('/getPaylodSize/:apiConfigId', monitorController.getPS);

module.exports = router;