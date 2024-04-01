
const Reservation = require('../models/reservation.model');

exports.getAvailabilityPage = async (req, res, next) => {
    try {
       
        const availability = await getAvailability();

        res.render('availability', { availability: availability });
    } catch (error) {
        console.log(error);
        res.status(500).send("Une erreur est survenue lors de la récupération des dates disponibles.");
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








exports.getReservationPage = (req, res, next) => {
    res.render('reservation');
};

exports.postReservationData = async (req, res, next) => {
    try {
        const { startDate, endDate, roomId } = req.body;
        const userId = req.session.userId;

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
