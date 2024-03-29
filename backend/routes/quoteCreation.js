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
    if(gallons_requested > 100000000) {
        return res.status(400).send("Gallons Requested must be less than 100000000");
    }
    if(delivery_address > 100) {
        return res.status(400).send("Delivery address must be less than 100 characters");
    }
    if(!delivery_date || !Object.prototype.toString.call(delivery_date) === '[object Date]') {
        return res.status(400).send("Delivery Date must not be empty and must be a valid date");
    }
    res.status(200).send('User profile information completed succesfully.');
});

// export the router module so that server.js file can use it
module.exports = router;
