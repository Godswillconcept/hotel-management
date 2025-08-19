const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { resolve } = require('path');
const apiAdminRoute = require('./routes/AdminRoute');
const userRoute = require('./routes/UserRoute');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const checkUserAuth = require('./middlewares/checkUserAuth');

// Load environment variables first
require('dotenv').config();

app.use(session({
    secret: "what is your name",
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}));

app.use(methodOverride('_method'));

app.use(express.static(resolve('assets')));
app.use(express.static(resolve('uploads')));

// Test database connectivity endpoint
app.get('/health/db', async (req, res) => {
    try {
        const connection = require('./models/Connection');
        const testConnection = await connection.getConnection();
        testConnection.release();
        res.json({ 
            status: 'success', 
            message: 'Database connection is healthy',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Database connection failed',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Public routes (NO authentication required)
app.use('/users', userRoute); // Guest registration should go here

// PROTECTED ROUTES - Authentication required  
app.use('/api/users', checkUserAuth, apiAdminRoute); // This handles admin management

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
