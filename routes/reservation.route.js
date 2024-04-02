const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// GET request to display the reservation page
router.get('/', reservationController.getReservationPage);

// POST request to submit reservation data
router.post('/', reservationController.postReservationData);

module.exports = router;
