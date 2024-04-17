const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trouver l'utilisateur dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      // Si l'utilisateur n'existe pas, renvoyer une erreur
      return res.status(401).send({ message: 'Authentication failed: invalid username or password' });
    }

    // Vérifier si le mot de passe est valide
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Si le mot de passe est incorrect, renvoyer une erreur
      return res.status(401).send({ message: 'Authentication failed: invalid username or password' });
    }

    // Si l'authentification réussit, générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envoyer le token dans un cookie et rediriger vers le tableau de bord
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/Dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const logoutUser = (req, res) => {
  try {
    // Effacer le token du navigateur du client
    res.clearCookie('token');
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
