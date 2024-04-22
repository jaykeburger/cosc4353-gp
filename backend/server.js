const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello root node');
});

// Route includes
const usersRoute = require('./routes/users');
const fuelHistoryRoute = require('./routes/fuelHistory');
const registrationRoute = require('./routes/registration');
const profileInfoRoute = require('./routes/profileInfo');
const login = require('./routes/login');
const quoteCreation = require('./routes/quoteCreation');
const profileManagement = require('./routes/profileManagement');
const priceAdjuster = require('./routes/priceAdjuster');

// Route usage
app.use('/users', usersRoute);
app.use('/history', fuelHistoryRoute);
app.use('/registration', registrationRoute);
app.use('/profileInfo', profileInfoRoute);
app.use('/login', login);
app.use('/quoteCreation', quoteCreation);
app.use('/profile-management', profileManagement);
app.use('/priceAdjuster', priceAdjuster);

// Define the port to listen on
const port = process.env.PORT || 3000;

let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`Node.js HTTP server is running on port ${port}`);
    });
}

module.exports = { app, server };