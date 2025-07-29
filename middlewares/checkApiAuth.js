const { expressjwt: jwt } = require('express-jwt');
const JWT_SECRET = process.env?.JWT_SECRET || "what is your name";

const authenticate = (req, res, next) => {
    // Check if user exists (only users should access admin routes)
    if (!req.auth || !req.auth.user) {
        return res.status(401).json({ 
            status: "error", 
            message: 'Unauthorized - Main User access required' 
        });
    }
    next();
}

module.exports = [jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), authenticate];