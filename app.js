const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { resolve } = require('path');
const apiAdminRoute = require('./routes/AdminRoute');
const userRoute = require('./routes/UserRoute');
// const adminRoute = require('./routes/AdminRoute');
const fileUpload = require('express-fileupload');
// const checkApiAuth = require('./middlewares/checkApiAuth');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

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

// Use this configuration instead
app.use(methodOverride('_method'));

app.use(express.static(resolve('assets')));
app.use(express.static(resolve('uploads')));
app.use(userRoute);
app.use('/users',  apiAdminRoute);
// app.use('/admin', checkAuth, adminRoute); // ssr

app.all('/*splat', (req, res) => {
    res.json(
        {
            status: "error",
            message: "Invalid API endpoint",
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`);
});
