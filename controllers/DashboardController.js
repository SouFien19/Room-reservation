const jwt = require('jsonwebtoken');
const MeetingRoom = require('../models/MeetingRoom');

// Extract token from cookies
const getTokenFromCookies = (req) => {
    const cookieHeader = req.headers.cookie;
  
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
  
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('token=')) {
                return cookie.substring('token='.length);
            }
        }
    }
  
    return null;
};

// Controller function to render the dashboard view
const dashboard = async (req, res) => {
  try {
    // Extract token from cookies
    const token = getTokenFromCookies(req);

    if (!token) {
        // If token is missing, user is not authenticated
        return res.render('dashboard', { isAuthenticated: false, meetingRooms: [] });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    // Fetch meeting rooms
    const meetingRooms = await MeetingRoom.find();

    // Render the dashboard view with meeting rooms and authentication status
    res.render('dashboard', { isAuthenticated: true, meetingRooms });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  dashboard,
};
