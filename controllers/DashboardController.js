const jwt = require('jsonwebtoken');
const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/MeetingRoom');

const dashboard = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
        return res.render('dashboard', { isAuthenticated: false, meetingRooms: [], reservations: [], availability: {} });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    const meetingRooms = await MeetingRoom.find();
    
    // Fetch reservations for the current user
    const reservations = await Reservation.find({ userId: req.userId });

    // Fetch availability data
    const availability = await getAvailability();

    res.render('dashboard', { isAuthenticated: true, meetingRooms, reservations, availability });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

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

module.exports = {
  dashboard,
};
