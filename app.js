const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { resolve } = require('path');
// const apiAdminRoute = require('./routes/apiAdminRoute');
// const adminRoute = require('./routes/adminRoute');
// const userRoute = require('./routes/userRoute');
const fileUpload = require('express-fileupload');
const checkApiAuth = require('./middlewares/checkApiAuth');
const methodOverride = require('method-override');
const session = require('express-session');
// const flash = require('./middlewares/flash');

app.use(session({
    secret: "don't share this secret with anyone",
    resave: false,
    saveUninitialized: true,
}));
// app.use(flash)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}));

// Use this configuration instead
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', resolve('views'));
app.use(express.static(resolve('assets')));
app.use(express.static(resolve('uploads')));
// app.use(userRoute);
// app.use('/api/admin', checkApiAuth, apiAdminRoute);
// app.use('/admin', checkAuth, adminRoute); // ssr

app.all('/*splat', (req, res) => {
    res.status(404).sendFile(resolve('views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`);
});