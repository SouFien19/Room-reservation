const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');
const authenticate = require('../middleware/authMiddleware');


// POST route to dash 
router.get('/',authenticate,dashboardController.dashboard);


module.exports = router;
