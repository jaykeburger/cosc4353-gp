const mysql = require('mysql');
const config = require('../config');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        // console.error('Error connecting to MySQL server:', err);
        return;
    }
    //console.log('Login database connected');
});

async function loginUser(username, password, callback) {
    connection.query(
        'SELECT * FROM `login` WHERE `username` = ?',
        [username],
        async (err, results) => {
            if (err) {
                // console.error('Error querying database:', err);
                return callback(err, null);
            }
            if (results.length === 0) {
                // console.log('User not found');
                return callback(null, false); 
            }

            const isMatch = await bcrypt.compare(password, results[0].password);
            if (isMatch) {
                // console.log('Login successful');
                return callback(null, true); 
            } else {
                // console.log('Password does not match');
                return callback(null, false);
            }
        }
    );
}

module.exports = {
    loginUser
};
