const jwt = require('jsonwebtoken');
const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/MeetingRoom');
const User = require('../models/user');

exports.dashboard = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.render('dashboard', { isAuthenticated: false, meetingRooms: [], reservations: [], availability: {}, user: null });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    const meetingRooms = await MeetingRoom.find();
    
    // Fetch all reservations and populate roomId and userId fields
    const reservations = await Reservation.find().populate('roomId').populate('userId', 'username');

    // Fetch availability data using the defined function
    const availability = await getAvailability();

    // Fetch user data
    const user = await User.findById(req.userId).select('username');

    res.render('dashboard', { isAuthenticated: true, meetingRooms, reservations, availability, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error', error: error.message }); // Add error message to response
  }
};


// Define the getAvailability function
async function getAvailability() {
  try {
    const reservations = await Reservation.find();
    const availability = {};
    reservations.forEach(reservation => {
      if (!availability[reservation.roomId]) {
        availability[reservation.roomId] = [];
      }
      availability[reservation.roomId].push({ startDate: reservation.startDate, endDate: reservation.endDate });
    });
    return availability;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
