const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const registercontroller = require('../controllers/registrationcontroller')

// Define a route
router.post('/', (req, res) => {
    // console.log("body:", req.body)
    // console.log("query:", req.query)
    // console.log(req.body)
    // const { username, password, password_confirm } = req.body
    // const username = req.query.username;
    // const password = req.query.password
    const username = req.body.username;
    const password = req.body.password
    const password_confirm = req.body.password_confirm;

    if (password !== password_confirm) {
        return res.status(400).send("Passwords do not match!");
    }
    if (username.length < 5) {
        return res.status(400).send('Username must be atleast 5 characters');
    }
    if (username.length > 12) {
        return res.status(400).send('Username must be less than 12 characters');
    }
    if (password.length < 5) {
        return res.status(400).send('Password must be atleast 5 characters');
    }
    if (password.length > 12) {
        return res.status(400).send('Password must be less than 12 characters');
    }
    if (username.includes(' ')) {
        return res.status(400).send('Username cannot contain spaces');
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).send('Username cannot contain special characters');
    }
    if (/^[a-zA-Z0-9]+$/.test(password)) {
        return res.status(400).send('Password must contain special characters');
    }
    registercontroller.checkUsername(username, (err, results) => {
        // console.log('results:', results, " and result length:,", results.length)
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }    
        if(results.length !== 0){
            return res.status(400).send('This username is already in use')
        }

    // If the username is not taken, continue with registration
    registercontroller.registerProfile(username, password, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});
});

// export the router module so that server.js file can use it
module.exports = router;
