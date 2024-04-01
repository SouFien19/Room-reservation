const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Ajout du middleware cookie-parser

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Utilisation du middleware cookie-parser
app.use(cookieParser());

// Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const meetingRoomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/auth', authRoutes);
app.use('/rooms', meetingRoomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
