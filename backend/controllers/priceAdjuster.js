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
	console.log('Price Adjuster Ready');
});

function getHistoryAndState(username, callback) {
    connection.query(
        "SELECT (SELECT COUNT(*) FROM fuelquote WHERE quoteCreatorID = (SELECT userID FROM user WHERE username = ?)) AS count, (SELECT state FROM user WHERE username = ?) AS state LIMIT 1;",
        [username, username],
        (err, results) => {
            if (err) {
                callback(err);
                return;
            }

            if (results.length === 0) {
                callback(null, null); // Return null if no results found
                return;
            }

            callback(null, results[0]); // Return the first (and only) result
        }
    );
}


module.exports = {
	getHistoryAndState
};