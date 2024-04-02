// ReservationController.js
const Reservation = require('../models/reservation.model');
const MeetingRoom = require('../models/meetingRoom');

exports.getReservationPage = async (req, res, next) => {
    try {
        const meetingRooms = await MeetingRoom.find();
        res.render('reservation', { meetingRooms });
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la récupération des salles disponibles.");
    }
};

exports.postReservationData = async (req, res, next) => {
    try {
        const { startDate, endDate, roomId } = req.body;
        const userId = req.userId; // Récupérer l'userId de la session ou du token
        const isRoomAvailable = await checkRoomAvailability(startDate, endDate, roomId);
        if (!isRoomAvailable) {
            return res.status(400).send("La salle sélectionnée n'est pas disponible pour ces dates.");
        }
        const reservation = new Reservation({
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
            userId: userId
        });
        await reservation.save();
        res.redirect('/dashboard');
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
        return !existingReservation;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
