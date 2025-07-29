const { expressjwt: jwt } = require('express-jwt');
const JWT_SECRET = process.env?.JWT_SECRET || "what is your name";

const authenticate = (req, res, next) => {
    if (!req.auth?.guest || !req.auth?.user) {
        return res.status(401).json({ status: "error", message: 'Unauthorized' });
    }
    next();
}

module.exports = [jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), authenticate];