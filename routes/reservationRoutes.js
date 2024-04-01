const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authMiddleware');

// POST create a new reservation
router.post('/add', authenticate, reservationController.createReservation);

// GET all reservations
router.get('/show', authenticate, reservationController.getAllReservations);

// GET all reservations for a specific user
router.get('/user/:userId', authenticate, reservationController.getAllReservationsForUser);

// PUT update an existing reservation
router.put('/:id', authenticate, reservationController.updateReservation);

// DELETE delete an existing reservation
router.delete('/:id', authenticate, reservationController.deleteReservation);

module.exports = router;
