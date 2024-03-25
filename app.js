const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

//var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

module.exports = app;
