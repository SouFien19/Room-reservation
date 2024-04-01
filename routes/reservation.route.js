// reservation.route.js

const express = require('express');
const router = express.Router();
const ReservationController = require("../controllers/reservation.controller");

router.get('/reservation', ReservationController.getReservationPage);
router.post('/reservation', ReservationController.postReservationData);
router.get('/availability', ReservationController.getAvailabilityPage);

module.exports = router;
