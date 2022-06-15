const { Pool } = require("pg");
const {
	PG_HOST,
	PG_USER,
	PG_PASSWORD,
	PG_DATABASE,
	PG_PORT,
} = require("../helpers/env");

const db = new Pool({
	host: PG_HOST,
	user: PG_USER,
	password: PG_PASSWORD,
	database: PG_DATABASE,
	port: PG_PORT,
	// ssl: {
	//   rejectUnauthorized: false,
	// },
});

// check connection
db.connect((err) => {
	if (err) {
		console.log("db error");
		console.log(err.message);
	} else {
		console.log("DB CONNECTED");
	}
});

module.exports = db;
