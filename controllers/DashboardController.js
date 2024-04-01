const jwt = require('jsonwebtoken');
const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/MeetingRoom');

const dashboard = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
        return res.render('dashboard', { isAuthenticated: false, meetingRooms: [], reservations: [] });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    const meetingRooms = await MeetingRoom.find();
    
    // Fetch reservations for the current user
    const reservations = await Reservation.find({ userId: req.userId });

    res.render('dashboard', { isAuthenticated: true, meetingRooms, reservations });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  dashboard,
};
