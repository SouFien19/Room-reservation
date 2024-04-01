// reservation.route.js

const express = require('express');
const router = express.Router();
const ReservationController = require("../controllers/reservation.controller");

router.get('/', ReservationController.getReservationPage);
router.post('/', ReservationController.postReservationData);
router.get('/availability', ReservationController.getAvailabilityPage);

module.exports = router;
