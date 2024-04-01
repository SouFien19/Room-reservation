// reservationController.js
const Reservation = require('../models/reservation');

const createReservation = async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.body;
    const userId = req.session.userId; // Fetch userId from session
    const newReservation = new Reservation({ userId, roomId, startTime, endTime });
    await newReservation.save();
    res.status(201).send({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAllReservations = async (req, res) => {
  try {
    // Logique pour récupérer toutes les réservations
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAllReservationsForUser = async (req, res) => {
  try {
    // Logique pour récupérer les réservations d'un utilisateur spécifique
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const updateReservation = async (req, res) => {
  try {
    // Logique pour mettre à jour une réservation existante
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const deleteReservation = async (req, res) => {
  try {
    // Logique pour supprimer une réservation existante
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getAllReservationsForUser,
  updateReservation,
  deleteReservation
};
