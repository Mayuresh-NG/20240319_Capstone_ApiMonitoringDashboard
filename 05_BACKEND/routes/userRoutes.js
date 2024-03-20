const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController");
const { verifyToken } = require('../middlewares/auth');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

router.use(verifyToken)
router.get('/info', UserController.info);

module.exports = router;