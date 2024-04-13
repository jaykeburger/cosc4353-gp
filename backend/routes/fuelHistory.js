const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const fhcontroller = require('../controllers/fuelHistorycontroller')

// Define a route
router.get('/', (req, res) => {
    // const clientID = req.body.clientID;
    const username = req.query.username;
    fhcontroller.getHistory(username, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// // //handling search
// router.get('/search', (req, res) => { 
//     const filters = req.query;
//     const filteredUsers = data.filter(user => {
//         let isValid = true;
//         for (key in filters) {
//             if (key === 'name' && filters.name !== '') {
//                 if (!/^[a-zA-Z\s]+$/.test(filters.name) || filters.name.length > 50) {
//                     res.status(400).send('Invalid input for name');
//                     return isValid;
//                 }
//                 isValid = isValid && user.clientname.includes(filters.name);
//             } else if (key === 'mingallons' && filters.mingallons !== '') {
//                 if (filters.maxgallons !== '' && parseInt(filters.maxgallons) < parseInt(filters.mingallons)) {
//                     res.status(400).send('Max gallons must be greater than or equal to min gallons');
//                     return isValid;
//                 }
//                 isValid = isValid && user.gallonsrequest >= parseInt(filters.mingallons);
//             } else if (key === 'maxgallons' && filters.maxgallons !== '') {
//                 isValid = isValid && user.gallonsrequest <= parseInt(filters.maxgallons);
//             }else if (key === 'minprice' && filters.minprice !== '') {
//                 if (filters.maxprice !== '' && parseInt(filters.maxprice) < parseInt(filters.minprice)) {
//                     res.status(400).send('Max Price must be greater than or equal to min price');
//                     return isValid;
//                 }
//                 isValid = isValid && user.suggestedprice >= parseInt(filters.minprice);
//             } else if (key === 'maxprice' && filters.maxprice !== '') {
//                 isValid = isValid && user.suggestedprice <= parseInt(filters.maxprice);
//             } else if (key === 'startdate' && filters.startdate !== '') {
//                 if (filters.enddate !== '' && filters.enddate < filters.startdate) {
//                     res.status(400).send('End Date must be after the Start date');
//                     return isValid;
//                 }
//                 isValid = isValid && new Date(user.deliverydate) >= new Date(filters.startdate);
//             } else if (key === 'enddate' && filters.enddate !== '') {
//                 isValid = isValid && new Date(user.deliverydate) <= new Date(filters.enddate);
//             }
//         }
//         return isValid;
//     });
//     const clientID = 1
//     const mingallons = req.query.mingallons;
//     const maxgallons = req.query.maxgallons;
//     const minprice = req.query.minprice;
//     const maxprice = req.query.maxprice;
//     const startdate = req.query.startdate;
//     const enddate = req.query.enddate;
//     fhcontroller.getQueryHistory(clientID, mingallons, maxgallons, minprice, maxprice, startdate, enddate, (err, results) => {
//         if (err) {
//             res.status(500).json({ message: 'Internal Server Error' });
//         } else {
//             res.status(200).json(results);
//         }
//     });
// });

module.exports = router;
