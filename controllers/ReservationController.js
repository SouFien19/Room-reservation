const Reservation = require('../models/reservation');

// Controller function to get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to get all reservations for a specific user
const getAllReservationsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservations = await Reservation.find({ user: userId });
    res.status(200).send(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to create a new reservation
const createReservation = async (req, res) => {
  try {
    const { roomId,userId, startTime, endTime } = req.body;
    console.log(req.body);
    const newReservation = new Reservation({ userId,roomId, startTime, endTime });
    await newReservation.save();
    res.status(201).send({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to update an existing reservation
const updateReservation = async (req, res) => {
  try {
    const { user, startTime, endTime } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { user, startTime, endTime },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send({ message: 'Reservation updated successfully', reservation: updatedReservation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to delete an existing reservation
const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllReservations,
  getAllReservationsForUser,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
