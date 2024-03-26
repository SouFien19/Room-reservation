const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const meetingRoomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/auth', authRoutes);
app.use('/rooms', meetingRoomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/', indexRouter);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
