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
	console.log('Profile Management Database connected');
});

// controllers/profileManagementController.js

function getInfo(username, callback) {
    const query = `
        SELECT firstname, lastname, email, add1, add2, city, state, zipcode
        FROM user
        WHERE username = ?
    `;
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Failed to retrieve user data:', err);
            return callback(err, null);
        }
        callback(null, results[0]); // assuming username is unique
    });
}

function updateInfo(username, data, callback) {
    const { firstname, lastname, email, add1, add2, city, state, zipcode } = data;
    const query = `
        UPDATE user
        SET firstname = ?, lastname = ?, email = ?, add1 = ?, add2 = ?, city = ?, state = ?, zipcode = ?
        WHERE username = ?
    `;
    connection.query(query, [firstname, lastname, email, add1, add2, city, state, zipcode, username], (err, results) => {
        if (err) {
            console.error('Failed to update user data:', err);
            return callback(err);
        }
        callback(null, { message: 'Profile updated successfully', affectedRows: results.affectedRows });
    });
}

module.exports = { 
    getInfo, 
    updateInfo 
};
