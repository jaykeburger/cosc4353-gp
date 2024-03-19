const express = require('express');
const { route } = require('./users');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define a route
router.post('/', (req, res) => {
    const { username, password, password_confirm } = req.body

    if (password !== password_confirm) {
        return res.status(401).send("Passwords do not match!");
    }
    // Check if username is 'jappleseed'
    if (username === 'jappleseed') {
        return res.status(402).send('This username is already in use');
    }
    if (username.length < 5) {
        return res.status(402).send('Username must be atleast 5 characters');
    }
    if (username.includes(' ')) {
        return res.status(402).send('Username cannot contain spaces');
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(402).send('Username cannot contain special characters');
    }
    res.status(200).send('User registered successfully');
});

// export the router module so that server.js file can use it
module.exports = router;
