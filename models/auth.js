const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
