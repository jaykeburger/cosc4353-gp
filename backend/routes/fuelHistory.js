const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const data = [
    {
            clientname: 'John Doe',
            gallonsrequest: 100,
            shippingaddress: '123 Main St',
            deliverydate: '2024-03-20',
            suggestedprice: 200,
            amountdue: 200
        },
        {
            clientname: 'Jane Smith',
            gallonsrequest: 150,
            shippingaddress: '456 Elm St',
            deliverydate: '2024-03-21',
            suggestedprice: 300,
            amountdue: 300
        },
        {
            clientname: 'Alice Johnson',
            gallonsrequest: 120,
            shippingaddress: '789 Oak St',
            deliverydate: '2024-03-22',
            suggestedprice: 240,
            amountdue: 240
        },
        {
            clientname: 'Bob Brown',
            gallonsrequest: 80,
            shippingaddress: '101 Pine St',
            deliverydate: '2024-03-23',
            suggestedprice: 160,
            amountdue: 160
        },
        {
            clientname: 'Emily Davis',
            gallonsrequest: 200,
            shippingaddress: '202 Cedar St',
            deliverydate: '2024-03-24',
            suggestedprice: 400,
            amountdue: 400
        }
    ]
// Define a route
router.get('/', (req, res) => {
    res.json(data);
});

//handling search
router.get('/search', (req, res) => {
    const filters = req.query;
    const filteredUsers = data.filter(user => {
        let isValid = true;
        for (key in filters) {
            // console.log(key)
            if (key === 'clientname') {
                isValid = isValid && user.clientname === filters.clientname;
            }else if (key === 'mingallons') {
                isValid = isValid && user.gallonsrequest >= parseInt(filters.mingallons);
            }else if (key === 'maxgallons') {
                isValid = isValid && user.gallonsrequest <= parseInt(filters.maxgallons);
            }else if (key === 'minprice') {
                isValid = isValid && user.suggestedprice >= parseInt(filters.minprice);
            }else if (key === 'maxprice') {
                isValid = isValid && user.suggestedprice <= parseInt(filters.maxprice);
            }else if (key === 'beforedate') {
                isValid = isValid && new Date(user.deliverydate) <= new Date(filters.beforedate);
            } else if (key === 'afterdate') {
                isValid = isValid && new Date(user.deliverydate) >= new Date(filters.afterdate);
            }
        }
        return isValid;
    });
    res.send(filteredUsers);
});

// export the router module so that server.js file can use it
module.exports = router;
