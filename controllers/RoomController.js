const MeetingRoom = require('../models/MeetingRoom');

// Controller function to get all meeting rooms
const getAllMeetingRooms = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.status(200).send(meetingRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to create a new meeting room
const createMeetingRoom = async (req, res) => {
  try {
    const { name, capacity, amenities } = req.body;
    const newMeetingRoom = new MeetingRoom({ name, capacity, amenities });
    await newMeetingRoom.save();
    res.redirect('/dashboard'); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to get a single meeting room by ID
const getMeetingRoomById = async (req, res) => {
  try {
    const meetingRoom = await MeetingRoom.findById(req.params.id);
    if (!meetingRoom) {
      return res.status(404).send({ message: 'Meeting room not found' });
    }
    res.status(200).send(meetingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to update an existing meeting room
const updateMeetingRoom = async (req, res) => {
  console.log(req.body);
  try {
    const { roomName, roomCapacity, roomAmenities } = req.body;
    const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(req.params.id, { name: roomName, capacity: roomCapacity ,amenities:roomAmenities}, { new: true });

    if (!updatedMeetingRoom) {
      return res.status(404).send({ message: 'Meeting room not found' });
    }
    res.redirect('/dashboard'); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const renderEditRoomPage = async (req, res) => {
  try {
      const roomId = req.params.id;
      const room = await MeetingRoom.findById(roomId);
      if (!room) {
          return res.status(404).send({ message: 'Room not found' });
      }
      res.render('editRoom', { title: 'Edit Room', room });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
};
// Controller function to delete a room
const deleteMeetingRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const deletedRoom = await MeetingRoom.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return res.status(404).send({ message: 'Room not found' });
    }
    res.redirect('/dashboard'); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMeetingRooms,
  createMeetingRoom,
  getMeetingRoomById,
  updateMeetingRoom,
  deleteMeetingRoom,
  renderEditRoomPage
};
