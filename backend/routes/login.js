const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// dummy user data for demonstration

const users = {
    'apple': {
        username: 'apple',
        password: '12345!', 
    }
};

// define the login route
router.post('/', (req, res) => {
    const {username, password} = req.body;

    if (!username) {
        return res.status(400).send('Username is required.');
    }
    if (!password) {
        return res.status(400).send('Password is required.');
    }

    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).send('Invalid username or password');
    }

  // login successful
    res.status(200).send('User logged in successfully');
});

// export the router module so that server.js file can use it
module.exports = router;