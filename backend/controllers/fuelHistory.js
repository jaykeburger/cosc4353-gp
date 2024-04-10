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
	console.log('Database connected');
});