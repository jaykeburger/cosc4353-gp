const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello root node');// this gets executed when user visit http://localhost:3000/
});

// Include route files
const usersRoute = require('./routes/users');

// Use routes
app.use('/users', usersRoute);

// Specify the port to listen on
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});


