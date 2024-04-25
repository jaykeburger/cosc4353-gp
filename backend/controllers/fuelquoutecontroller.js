const mysql = require('mysql');
const { user } = require('../config');
const config = require('../config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
	if (err) {
		{
			// console.error('Error connecting to MySQL server:', err);
			return;
		}
	}
	//console.log('Database connected');
});

function fuelQuote(username, gallons, suggestedPrice, delivery_address, delivery_date, total_price, callback) {
    console.log("To SQL:", username, gallons, suggestedPrice, delivery_address, delivery_date, total_price);
    connection.query(
        `INSERT INTO fuelquote(quoteCreatorID, gallonsRequested, suggestPrice, deliveryAddress, deliveryDate, ClientName, totalDue) SELECT u.userID, ?, ?, ?, ?, u.firstname, ? FROM user u WHERE u.username = ?`,
        [gallons, suggestedPrice, delivery_address, delivery_date, total_price, username],
        (error, results) => {
            if (error) {
                console.error("Error executing SQL query:", error);
                callback(error, null);
                return; // Return early to prevent further execution
            }
            // Successful query execution
            console.log("Fuel quote inserted successfully");
            callback(null, results);
        }
    );
}


function getAddress(username, callback) {
	connection.query(
        "select add1, city, state, zipcode from user where username=?",
		[username],
		callback
	);
}

module.exports = {
	fuelQuote,
	getAddress
};