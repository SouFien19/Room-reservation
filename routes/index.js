const express = require('express');

const router = express.Router();

// Main page route
router.get('/', (req, res) => {
    res.send('Welcome to the main page!');
});

module.exports = router;