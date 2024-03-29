const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Controller function to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }
  

    // Create a new user
    const newUser = new User({ username, password: password });
    await newUser.save();
     // Redirect to login page
    res.redirect('/login');
  //  res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: 'Authentication failed: username not found' });
    }

    // Check if the password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Authentication failed: invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { maxAge: 3600000 }); // Max age in milliseconds, set to 1 hour
    res.redirect('/dashboard');

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller function to log out a user
const logoutUser = (req, res) => {
  try {
    // Clear the token from the client's browser
    res.clearCookie('token');
    
    // Redirect to the login page or any other appropriate page
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
