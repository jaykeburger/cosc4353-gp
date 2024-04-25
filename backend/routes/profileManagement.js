// routes/profileManagement.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const { getInfo, updateInfo } = require('../controllers/profileManagementController');

// Fetch user info
router.get('/', (req, res) => {
    const { username } = req.query;
    getInfo(username, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Failed to retrieve user data' });
            return;
        }
        res.send(user);
    });
});

// Update user info
router.post('/', (req, res) => {
    const { username } = req.query;
    const { firstname, lastname, add1, add2, city, state, zipcode } = req.body;

    console.log(req.body);

    if (!firstname || firstname.trim().length === 0 || !/[A-Za-z]+/.test(firstname)) {
        return res.status(400).send("First Name must contain letters and cannot be empty");
    }
    if (firstname.length > 50) {
        return res.status(400).send("First Name must be less than 50 characters");
    }

    if (!lastname || lastname.trim().length === 0 || !/[A-Za-z]+/.test(lastname)) {
        return res.status(400).send("Last Name must contain letters and cannot be empty");
    }
    if (lastname.length > 50) {
        return res.status(400).send("Last Name must be less than 50 characters");
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
    if (!state || state.trim().state === 0) {
        return res.status(400).send("State cannot be empty");
    }
    if (!zipcode || !/^\d+$/.test(zipcode)) {
        return res.status(400).send("Zipcode cannot be empty");
    }
    if (zipcode.length > 9) {
        return res.status(400).send("Zipcode must be less than 9 characters");
    }
    if (zipcode.length < 5) {
        return res.status(400).send("Zipcode must be at least 5 characters");
    }
    updateInfo(username, req.body, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Failed to update user data' });
            return;
        }
        res.send(result);
    });
});

module.exports = router;
