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
	console.log('User Database connected');
});

function registerUser(name, add1, add2, city, state, zipcode, callback) {
    connection.query(
        "INSERT INTO user (`name`, `add1`, `add2`,`city`,`state`,`zipcode`) VALUES (?, ?)",
        [name, add1, add2, city, state, zipcode],
        callback
    );
}


module.exports = {
	registerUser
};