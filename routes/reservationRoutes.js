const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authMiddleware');

// GET all reservations
router.get('/show', authenticate, reservationController.getAllReservations);

// GET all reservations for a specific user
router.get('/user/:userId', authenticate, reservationController.getAllReservationsForUser);

// POST create a new reservation
router.post('/add', authenticate, reservationController.createReservation);

// GET a single reservation by ID
router.get('/show/:id', authenticate, reservationController.getReservationById);

// PUT update an existing reservation
router.put('/update/:id', authenticate, reservationController.updateReservation);

// DELETE delete an existing reservation
router.delete('/delete/:id', authenticate, reservationController.deleteReservation);

module.exports = router;
