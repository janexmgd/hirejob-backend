require("dotenv").config();

module.exports = {
	// application
	APP_NAME: process.env.APP_NAME,
	LISTEN_PORT: process.env.LISTEN_PORT,
	APP_HOST: process.env.APP_HOST,
	PORT: process.env.PORT,
	// database
	PG_HOST: process.env.PG_HOST,
	PG_USER: process.env.PG_USER,
	PG_PASSWORD: process.env.PG_PASSWORD,
	PG_DATABASE: process.env.PG_DATABASE,
	PG_PORT: process.env.PG_PORT,
	// jwt
	JWT_SECRET: process.env.JWT_SECRET,
	// email
	GMAIL_USER: process.env.GMAIL_USER,
	GMAIL_PASS: process.env.GMAIL_PASS,
	//api
	APP_URL: process.env.APP_URL,
};
