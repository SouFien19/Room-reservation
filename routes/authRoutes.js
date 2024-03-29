const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// POST route to register a new user
router.post('/register', authController.registerUser);

// POST route to log in a user
router.post('/login', authController.loginUser);

// GET route to logout a user
router.post('/logout', authController.logoutUser); 

module.exports = router;
