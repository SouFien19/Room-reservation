const express = require('express');
const roomController = require('../controllers/RoomController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Main page route
router.get('/', (req, res) => {
    res.send('Welcome to the main page!');
});

// Render the register form
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Render the login form
router.get('/login', (req, res) => {
    res.render('login'); 
});

// Inside roomRoutes.js
router.get('/createroom', (req, res) => {
    res.render('createroom', { title: 'Create Room' });
});

// Route for rendering the edit room page
router.get('/editroom/:id',authenticate ,roomController.renderEditRoomPage);

// Inside reservationRoutes.js
router.get('/makeReservation',authenticate,(req, res) => {
    res.render('makeReservation', { title: 'Make Reservation' });
});

module.exports = router;
