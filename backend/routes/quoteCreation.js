const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const quoteCreationController = require('../controllers/fuelquoutecontroller');

// Define a route
router.get('/getAddress', (req, res) => {
    const username = req.query.username;
    quoteCreationController.getAddress(username, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results[0]);
    });
});


router.post('/', (req, res) => {
    console.log("testing:", req.body)
    var { gallons, add1, city, state, zipcode, total_due, delivery_date, suggested_price } = req.body
    const delivery_address = add1 + ', ' + city + ', ' + state + ', ' + zipcode
    delivery_date = '2025-11-10'
    // console.log(delivery_date)
    if(!gallons || gallons.trim().length === 0 || isNaN(gallons)) {
        return res.status(400).send("Gallons Requested must contain numbers and cannot be empty");
    }
    if(gallons > 100000000) {
        return res.status(400).send("Gallons Requested must be less than 100000000");
    }
    if(gallons < 0) {
        return res.status(400).send("Gallons must be positive");
    }
    // if(delivery_address > 100) {
    //     return res.status(400).send("Delivery address must be less than 100 characters");
    // }
    // if(!delivery_date || !Object.prototype.toString.call(delivery_date) === '[object Date]') {
    //     return res.status(400).send("Delivery Date must not be empty and must be a valid date");
    // }
    const username = req.query.username;
    quoteCreationController.fuelQuote(username, gallons, suggested_price, delivery_address, delivery_date, total_due, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).send('Quote Creation completed succesfully.');
    });
    
});

// export the router module so that server.js file can use it
module.exports = router;
