const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/MeetingRoom');

exports.getReservationPage = async (req, res, next) => {
    try {
        const meetingRooms = await MeetingRoom.find();
        // Pass an empty error object initially
        res.render('reservation', { meetingRooms, error: null });
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la récupération des salles disponibles.");
    }
};

exports.postReservationData = async (req, res, next) => {
    try {
        const { startDate, endDate, roomId } = req.body;
        const userId = req.userId; // Retrieve the userId from the session or token

        // Check if the room is available for the selected dates
        const isRoomAvailable = await checkRoomAvailability(startDate, endDate, roomId);
        if (!isRoomAvailable) {
            // If the room is not available, send an error response
            const meetingRooms = await MeetingRoom.find();
            return res.render('reservation', { meetingRooms, error: "La salle sélectionnée n'est pas disponible pour ces dates." });
        }

        // If the room is available, proceed with reservation
        const reservation = new Reservation({
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
            userId: userId
        });
        await reservation.save();
        res.redirect('/dashboard'); // Redirect to the dashboard after successful reservation
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la réservation.");
    }
};


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
  