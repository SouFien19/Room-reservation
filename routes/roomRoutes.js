const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController');
const authenticate = require('../middleware/authMiddleware');

// GET all meeting rooms
router.get('/show', roomController.getAllMeetingRooms);

// POST create a new meeting room
router.post('/add', authenticate, roomController.createMeetingRoom);

// GET a single meeting room by ID
router.get('/show/:id', roomController.getMeetingRoomById);

// PUT update an existing meeting room
router.put('/update/:id',authenticate, roomController.updateMeetingRoom);

// DELETE delete an existing meeting room
router.delete('/delete/:id', authenticate, roomController.deleteMeetingRoom);

module.exports = router;
