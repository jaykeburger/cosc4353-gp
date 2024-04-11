const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const profileController = require('../controllers/profilecontroller');

// Define a route
router.post('/', (req, res) => {
    const { name, add1, add2, city, state, zipcode } = req.body;
    console.log('profile info hit');
    if (!name || name.trim().length === 0 || !/[A-Za-z]+/.test(name)) {
        return res.status(400).send("Name must contain letters and cannot be empty");
    }
    if (name.length > 50) {
        return res.status(400).send("Name must be less than 50 characters");
    }
    if (!add1 || add1.trim().length === 0 || !/[A-Za-z]+/.test(add1)) {
        return res.status(400).send("Address 1 must contain letters and cannot be empty");
    }
    if (add1.length > 100) {
        return res.status(400).send("Address 1 must be less than 100 characters");
    }
    if (add2.length > 100) {
        return res.status(400).send("Address 2 must be less than 100 characters");
    }
    if (!city || city.trim().length === 0) {
        return res.status(400).send("City must contain cannot be empty");
    }
    if (!/^[A-Za-z]+$/.test(city)) {
        return res.status(400).send("City must only contain letters");
    }
    if (city.length > 100) {
        return res.status(400).send("City must be less than 100 characters");
    }
    if (!state || add1.trim().state === 0) {
        return res.status(400).send("State cannot be empty");
    }
    if (!zipcode || add1.trim().zipcode === 0 || !/^\d+$/.test(zipcode)) {
        return res.status(400).send("Zipcode cannot be empty");
    }
    if (zipcode.length > 9) {
        return res.status(400).send("Zipcode must be less than 9 characters");
    }
    if (zipcode.length < 5) {
        return res.status(400).send("Zipcode must be at least 5 characters");
    }

    profileController.registerUser(name, add1, add2, city, state, zipcode, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).send('User profile information succesfully input.');
        }
    });
});

// export the router module so that server.js file can use it
module.exports = router;

