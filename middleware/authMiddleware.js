const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ error: 'Access Denied' });
    }

    try {
        // Vérifier le token JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Authentication failed: invalid token' });
    }
};

module.exports = authenticate;
