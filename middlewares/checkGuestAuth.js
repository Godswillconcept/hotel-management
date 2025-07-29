const { expressjwt: jwt } = require('express-jwt');
const JWT_SECRET = process.env?.JWT_SECRET || "what is your name";

const authenticateGuest = (req, res, next) => {
    // Check if guest exists
    if (!req.auth || !req.auth.guest) {
        return res.status(401).json({ 
            status: "error", 
            message: 'No authorization token was found' 
        });
    }
    next();
}

module.exports = [jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), authenticateGuest];