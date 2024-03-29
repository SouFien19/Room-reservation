const jwt = require('jsonwebtoken');

const getTokenFromCookies = (req) => {
    const cookieHeader = req.headers.cookie;
  
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
  
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('token=')) {
                return cookie.substring('token='.length);
            }
        }
    }
  
    return null;
};

const authenticate = (req, res, next) => {
    const token = getTokenFromCookies(req);

    if (!token) {
        return res.status(401).send({ error: 'Access Denied' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Authentication failed: invalid token' });
    }
};

module.exports = authenticate;
