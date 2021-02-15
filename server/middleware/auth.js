const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.query.token;
        const decodedToken = jwt.verify(token, "SUPER_SECRET_SHOULD_BE_LONGER");
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Authentication failed!" });
    }
};