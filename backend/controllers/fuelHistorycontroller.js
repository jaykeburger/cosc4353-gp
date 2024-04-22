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
	// console.log('Fuel History connected');
});

// function getHistory(callback) {
// 	connection.query(
// 		'SELECT DISTINCT doctor.doctor_id,doctor.doctor_name FROM doctor INNER JOIN office ON doctor.office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ?',
// 		[location, reason],
// 		callback
// 	);
// }

function getHistory(username, callback) {
	connection.query(
		'SELECT fh.* FROM fuelquote fh JOIN user u ON fh.quoteCreatorID = u.userID WHERE u.username = ?',
		[username],
		callback
	);
}

// function getQueryHistory(clientID, mingallons, maxgallons, minprice, maxprice, startdate, enddate, callback) {
// 	connection.query(
// 		'SELECT * FROM `fuelquote` WHERE `quoteCreatorID` = ? AND ',
// 		[clientID, mingallons, maxgallons, minprice, maxprice, startdate, enddate],
// 		callback
// 	);
// }


module.exports = {
	getHistory,
	// getQueryHistory
};