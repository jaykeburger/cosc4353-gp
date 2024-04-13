const mysql = require('mysql');
const { user } = require('../config');
const config = require('../config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
	if (err) {
		{
			console.error('Error connecting to MySQL server:', err);
			return;
		}
	}
	console.log('Database connected');
});

function fuelQuote(clientID, gallons_requested, delivery_address, delivery_date, suggested_price, callback) {
	connection.query(
        "INSERT INTO fuelquote (`gallonsRequested`, `suggestPrice`, `deliveryAddress`, `deliveryDate`) VALUES (?, ?, ?, ?)",
		[clientID, gallons_requested, delivery_address, delivery_date, suggested_price],
		callback
	);
}

module.exports = {
	fuelQuote
};