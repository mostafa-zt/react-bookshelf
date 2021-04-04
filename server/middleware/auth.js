const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);

module.exports = (req, res, next) => {
    try {
        const token = req.query.token;
        const decodedToken = jwt.verify(token, config.SECRET);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Authentication failed!" });
    }
};