const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;