const Pool = require("pg").Pool;
require("dotenv").config();

const pool = () => new Pool({
	user: process.env.user,
	password: process.env.poolPass,
	host: "localhost",
	port: 5432,
	database: process.env.db
});

// pool.end(function(err) {
// if (err) {
// 	return console.log('error:' + err.message);
// }
// console.log('Close the database connection.');
// });

module.exports = pool;