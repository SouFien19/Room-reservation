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
    res.status(201).send({ message: 'Meeting room created successfully', meetingRoom: newMeetingRoom });
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
  try {
    const { name, capacity, amenities } = req.body;
    const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(
      req.params.id,
      { name, capacity, amenities },
      { new: true }
    );
    if (!updatedMeetingRoom) {
      return res.status(404).send({ message: 'Meeting room not found' });
    }
    res.status(200).send({ message: 'Meeting room updated successfully', meetingRoom: updatedMeetingRoom });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to delete an existing meeting room
const deleteMeetingRoom = async (req, res) => {
  try {
    const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(req.params.id);
    if (!deletedMeetingRoom) {
      return res.status(404).send({ message: 'Meeting room not found' });
    }
    res.status(200).send({ message: 'Meeting room deleted successfully' });
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
};
