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
    updateInfo(username, req.body, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Failed to update user data' });
            return;
        }
        res.send(result);
    });
});

module.exports = router;
