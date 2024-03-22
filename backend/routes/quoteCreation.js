const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define a route
router.post('/', (req, res) => {
    const { gallons_requested, delivery_address, delivery_date, price, total } = req.body
    if(!gallons_requested || gallons_requested.trim().length === 0 || isNaN(gallons_requested)) {
        return res.status(400).send("Gallons Requested must contain numbers and cannot be empty");
    }
    if(gallons_requested > 100000) {
        return res.status(400).send("Gallons Requested must be less than 100000");
    }
    if(delivery_address > 100) {
        return res.status(400).send("Delivery address must be less than 100 characters");
    }
    if(!delivery_date || !Object.prototype.toString.call(delivery_date) === '[object Date]') {
        return res.status(400).send("Delivery Date must not be empty and must be a valid date");
    }

/*
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
*/
    res.status(200).send('User profile information completed succesfully.');
});

// export the router module so that server.js file can use it
module.exports = router;
