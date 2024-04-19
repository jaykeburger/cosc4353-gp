const mysql = require('mysql');
//const { user } = require('../config');
const config = require('../config');
const bcrypt = require('bcrypt');

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

async function registerProfile(username, password, callback) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        console.log("Hashed Password: ", hashedPassword);
        connection.query(
            "INSERT INTO login (`username`, `password`) VALUES (?, ?)",
            [username, hashedPassword], // Storing the plaintext username and hashed password
            (err, results) => {
                if (err) {
                    console.error('Error in query:', err);
                    callback(err, null);
                    return;
                }
                callback(null, results);
            }
        );
    } catch (err) {
        console.error('Error hashing password:', err);
        callback(err, null);
    }
}

function checkUsername(username, callback) {
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