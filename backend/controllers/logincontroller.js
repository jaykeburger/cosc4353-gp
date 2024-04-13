const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Login database connected');
});

function loginUser(username, password, callback) {
    let hashedPwd = ModuloHash(password);
    connection.query(
        'SELECT * FROM `login` WHERE `username` = ? AND `password` = ?',
        [username, hashedPassword],
        (err, results) => { 
            if (err) {
                console.error('Error querying database:', err);
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, false);
            }
            return callback(null, true);
        }
    );
}

module.exports = {
    loginUser
};
