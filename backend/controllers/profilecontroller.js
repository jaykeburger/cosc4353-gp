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
	//console.log('User Database connected');
});

function registerInfo(username, firstname, lastname, add1, add2, city, state, zipcode, callback) {
    connection.query(
        "INSERT INTO `user` (`username`, `firstname`, `lastname`, `add1`, `add2`, `city`, `state`, `zipcode`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [username, firstname, lastname, add1, add2, city, state, zipcode],
        callback
    );
}


module.exports = {
	registerInfo
};