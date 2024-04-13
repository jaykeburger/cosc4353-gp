const mysql = require('mysql');
//const { user } = require('../config');
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

// function getHistory(callback) {
// 	connection.query(
// 		'SELECT DISTINCT doctor.doctor_id,doctor.doctor_name FROM doctor INNER JOIN office ON doctor.office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ?',
// 		[location, reason],
// 		callback
// 	);
// }

function registerProfile(username, password, callback) {
    let hashedPwd = ModuloHash(password);
    connection.query(
        "INSERT INTO login (`username`, `password`) VALUES (?, ?)",
        [username, password],
        callback
    );
}

function checkUsername(username, callback) {
    console.log('username:', username);
    connection.query(
        "SELECT * FROM `login` WHERE username = ?",
        [username],
        callback
    );
}

module.exports = {
	registerProfile,
    checkUsername
};