const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const authenticate = require('../middleware/authMiddleware');

// GET request to display the reservation page
router.get('/',authenticate, reservationController.getReservationPage);

// POST request to submit reservation data
router.post('/',authenticate, reservationController.postReservationData);
// DELETE request to delete a reservation
router.get('/delete/:id', authenticate, reservationController.deleteReservation);
// GET request to render the edit reservation page
router.get('/:id/edit', authenticate, reservationController.EditReservationPage);
router.post('/:id/edit', authenticate, reservationController.updateReservation);

module.exports = router;
