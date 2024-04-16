const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/MeetingRoom');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keaton.grimes21@ethereal.email',
        pass: 'J7dn8xdH1q7pAc7PR1'
    },  
    debug: true // Enable debugging
});

exports.getReservationPage = async (req, res, next) => {
    try {
        // Fetch meeting rooms
        const meetingRooms = await MeetingRoom.find();
        // Check if user is authenticated
        const isAuthenticated = req.userId ? true : false;
        // Fetch user data if authenticated
        let user = null;
        if (isAuthenticated) {
            user = await User.findById(req.userId).select('email');
        }
        // Pass meeting rooms, user, and authentication status to view
        res.render('reservation', { meetingRooms, user, isAuthenticated, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Une erreur est survenue lors de la récupération des salles disponibles.");
    }
};

// Middleware to authenticate user
exports.authenticateUser = async (req, res, next) => {
    try {
        // Retrieve token from request headers or cookies
        const token = req.cookies.token;

        if (token) {
            // Verify token and extract user ID
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.userId;
        }

        next(); // Call next middleware
    } catch (error) {
        console.error(error);
        res.status(401).send("Unauthorized"); // Unauthorized if token is invalid or missing
    }
};


exports.postReservationData = async (req, res, next) => {
    try {
        const { startDate, endDate, roomId, email } = req.body; // Also retrieve the email from the request body
        const userId = req.userId; // Retrieve the userId from the session or token

        // Check if the room is available for the selected dates
        const isRoomAvailable = await checkRoomAvailability(startDate, endDate, roomId);
        if (!isRoomAvailable) {
            // If the room is not available, send an error response
            const meetingRooms = await MeetingRoom.find();
            return res.render('reservation', { meetingRooms, user: req.user, isAuthenticated: true, error: "La salle sélectionnée n'est pas disponible pour ces dates." });
        }

        // If the room is available, proceed with reservation
        const reservation = new Reservation({
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
            userId: userId
        });
        await reservation.save();

        // Send confirmation email
        await sendConfirmationEmail(email, reservation); // Pass the email and reservation details to the function

        res.redirect('/dashboard'); // Redirect to the dashboard after successful reservation
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la réservation.");
    }
};

async function sendConfirmationEmail(email, reservationDetails) {
    try {
        const mailOptions = {
            from: 'keaton.grimes21@ethereal.email',
            to: email,
            subject: 'Reservation Confirmation',
            text: `Dear User,\n\nYour reservation details:\n\n${JSON.stringify(reservationDetails, null, 2)}\n\nThank you.`
        };

        // Send email using nodemailer transporter
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}


async function checkRoomAvailability(startDate, endDate, roomId) {
    try {
        const existingReservation = await Reservation.findOne({
            roomId: roomId,
            $or: [
                { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
                { startDate: { $eq: startDate }, endDate: { $eq: endDate } }
            ]
        });
        console.log('Existing Reservation:', existingReservation);
        return !existingReservation;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.deleteReservation = async (req, res) => {
    try {
      const reservationId = req.params.id;
      await Reservation.findByIdAndDelete(reservationId);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  exports.EditReservationPage = async (req, res, next) => {
    try {
        const reservationId = req.params.id;
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).send({ message: 'Reservation not found' });
        }
        res.render('editreservation', { title: 'Edit Reservation', reservation });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the reservation.");
    }
};

exports.updateReservation = async (req, res) => {
    try {
      const reservationId = req.params.id;
      const { startDate, endDate } = req.body; // Retrieve updated reservation details from request body
  
      // Find the reservation by ID and update its details
      const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, { startDate, endDate }, { new: true });
  
      // Check if the reservation was found and updated successfully
      if (!updatedReservation) {
        return res.status(404).send({ message: 'Reservation not found' });
      }
  
      // Redirect the user to the dashboard after successfully updating the reservation
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };
