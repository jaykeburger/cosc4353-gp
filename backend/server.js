const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    res.send('hello root node');// this gets executed when user visit http://localhost:3000/
});

// Include route files
const usersRoute = require('./routes/users');
const fuelHistoryRoute = require('./routes/fuelHistory');
const registrationRoute = require('./routes/registration');
const profileInfoRoute = require('./routes/profileInfo');

// Use routes
app.use('/users', usersRoute);
app.use('/history', fuelHistoryRoute);
app.use('/registration', registrationRoute);
app.use('/profileInfo', profileInfoRoute);

// Specify the port to listen on
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});


