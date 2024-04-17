const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Charger les variables d'environnement
dotenv.config();

// Créer une application Express
const app = express();

// Middleware de logging
app.use(logger('dev'));

// Middleware pour gérer les données JSON
app.use(express.json());

// Middleware pour gérer les données encodées dans l'URL
app.use(express.urlencoded({ extended: false }));

// Middleware pour les cookies
app.use(cookieParser());

// Middleware de gestion de session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Configurer le moteur de template EJS
app.set('view engine', 'ejs');

// Connecter les routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const meetingRoomRoutes = require('./routes/roomRoutes');
const reservationRouter = require('./routes/reservation.route');
const dashboardRouter = require('./routes/dashboardRoutes');

app.use('/auth', authRoutes);
app.use('/rooms', meetingRoomRoutes);
app.use('/reservation', reservationRouter);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// Connecter à MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Exporter l'application
module.exports = app;
