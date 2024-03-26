const mongoose = require('mongoose');

const meetingRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  reservations: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
});

const MeetingRoom = mongoose.model('MeetingRoom', meetingRoomSchema);

module.exports = MeetingRoom;
