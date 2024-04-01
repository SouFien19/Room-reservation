// reservation.model.js

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    roomId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
