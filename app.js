const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const meetingRoomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');

app.use('/auth', authRoutes);
app.use('/rooms', meetingRoomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

app.use(session({
  secret: 'sofien',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Your routes and middleware go here
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
