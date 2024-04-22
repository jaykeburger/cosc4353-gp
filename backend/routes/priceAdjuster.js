const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const fhcontroller = require('../controllers/priceAdjuster')

// Define a route
router.get('/', (req, res) => {

    // in post man, im sending this in the body, query is http://localhost:3000/priceAdjuster?username=johndoe
    // {
    // "gallons": 1000
    // }

    const username = req.query.username;
    const gallons = req.body.gallons;
    var margin = 0.1;
    var newRate = 0.0;
    fhcontroller.getHistoryAndState(username, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        } 
        if (!results) { // Change 'result' to 'results'
            // console.log('No results found for username:', username);
            return;
        }
        // console.log('Count:', results.count);
        // console.log('State:', results.state);
        if (results.state === 'TX'){
            // console.log('inState')
            margin += .02;
        } else {
            // console.log('outState')
            margin += .03;
        }
        if (results.count != 0){
            // console.log('discount!')
            margin -= .01;
        }
        if (gallons > 1000){
            // console.log('over1000')
            margin += .02;
        } else {
            // console.log('less1000')
            margin += .03;
        }
        newRate = 1.5 * margin;
        newRate += 1.5;
        const newPrice = newRate * gallons;

        res.status(200).json({newRate, newPrice});
    });
});


// export the router module so that server.js file can use it
module.exports = router;