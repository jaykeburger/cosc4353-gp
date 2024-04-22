const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const loginController = require('../controllers/logincontroller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// define the login route
router.post('/', (req, res) => {
    const {username, password} = req.body;
    console.log('Login hit');

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    loginController.loginUser(username, password, (err, success) => {
        if (err) {
            console.error('Error occurred while authenticating user:', err);
            return res.status(500).send('An error occurred while processing your request.');
        }
        if (!success) {
            console.log("No success");
            return res.status(401).send('Invalid username or password');
        }
        else{
            console.log("Logged in.");
            res.status(200).send('User logged in successfully');
        }
    });
});

// export the router module so that server.js file can use it
module.exports = router;