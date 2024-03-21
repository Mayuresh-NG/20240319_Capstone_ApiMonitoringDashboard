const express = require('express');
const router = express.Router();

// internal imports
const apiController = require("../controllers/apiController");
const { verifyToken } = require('../middlewares/auth');



router.use(verifyToken)
router.post('/config', apiController.config);
router.get('/loadapi', apiController.loadapi);
router.put('/update/:id', apiController.updatapi);
router.delete('/delete/:id', apiController.deleteapi);

module.exports = router;