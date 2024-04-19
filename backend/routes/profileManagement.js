const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const profileController = require('../controllers/profilecontroller');

// Define a route
router.post('/', (req, res) => {
    const { firstname, lastname, add1, add2, city, state, zipcode } = req.body;
    const { username } = req.query;
    console.log('Backend Username Retrieval:', username);

    if (!firstname || firstname.trim().length === 0 || !/[A-Za-z]+/.test(firstname)) {
        return res.status(400).send("First Name must contain letters and cannot be empty");
    }
    if (firstname.length > 50) {
        return res.status(400).send("First Name must be less than 50 characters");
    }


    profileController.registerInfo(username, firstname, lastname, add1, add2, city, state, zipcode, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).send('User profile information succesfully input.');
        }
    });

});

// export the router module so that server.js file can use it
module.exports = router;

