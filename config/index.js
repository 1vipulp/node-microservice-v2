"use strict";
module.exports = {
	env: process.env.NODE_ENV || "development",
	server: {
		port: process.env.PORT || 3005,
	},
	logging: {
		level: process.env.LOG_LEVEL || "debug",
	},
	db: {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		database: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD,
	},
	mailer: {
		send_grid_key: process.env.SENDGRID_API_KEY,
		admin_email: process.env.ADMIN_EMAIL,
	},
};
