const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello root node');// this gets executed when user visit http://localhost:3000/
});

// Include route files
const usersRoute = require('./routes/users');
const fuelHistoryRoute = require('./routes/fuelHistory');
const registrationRoute = require('./routes/registration');
const profileInfoRoute = require('./routes/profileInfo');
const login = require('./routes/login');
const quoteCreation = require('./routes/quoteCreation');
const profileManagement = require('./routes/profile-management');


// Use routes
app.use('/users', usersRoute);
app.use('/history', fuelHistoryRoute);
app.use('/registration', registrationRoute);
app.use('/profileInfo', profileInfoRoute);
app.use('/login', login);
app.use('/quoteCreation', quoteCreation)
app.use('profile-management', profileManagement);

// Specify the port to listen on
const port = 3000;

// Start the server
const server = app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});


module.exports = server;
