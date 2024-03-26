const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meetingRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'MeetingRoom', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
