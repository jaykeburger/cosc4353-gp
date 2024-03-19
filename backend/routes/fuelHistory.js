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

//ALL NAMES
router.post('/name', (req,res) =>{
    const { name } = req.body;
    const toSend = data.filter(element => element.clientname === name);
    return res.json(toSend)
});

router.post('/name&min', (req,res) =>{
    const { name } = req.body;
    const toSend = data.filter(element => element.clientname === name);
    return res.json(toSend)
});

router.post('/name&min&max', (req,res) =>{
    const { name } = req.body;
    const toSend = data.filter(element => element.clientname === name);
    return res.json(toSend)
});

router.post('/name&min&max&before', (req,res) =>{
    const { name } = req.body;
    const toSend = data.filter(element => element.clientname === name);
    return res.json(toSend)
});

router.post('/name&min&max&before%after', (req,res) =>{
    const { name } = req.body;
    const toSend = data.filter(element => element.clientname === name);
    return res.json(toSend)
});

// export the router module so that server.js file can use it
module.exports = router;
