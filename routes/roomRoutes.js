// roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController');
const authenticate = require('../middleware/authMiddleware');

// GET all meeting rooms
router.get('/show', authenticate, roomController.getAllMeetingRooms);

// POST create a new meeting room
router.post('/add', authenticate, roomController.createMeetingRoom);

// PUT update an existing meeting room
router.post('/editroom/:id', authenticate, roomController.updateMeetingRoom);

// DELETE delete an existing meeting room
router.get('/delete/:id', authenticate, roomController.deleteMeetingRoom);

module.exports = router;
