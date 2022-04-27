const { connection } = require("./../../db");

async function checkIfUserExists({ email }) {
	return new Promise(async (resolve, reject) => {
		try {
			connection.query(
				`SELECT id,email FROM users where email=? LIMIT 1`,
				[email],
				function (error, results, fields) {
					console.log(results);
					if (error) {
						reject(new Error("No user find"));
					}
					if (results && Array.isArray(results) && results.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			);
		} catch (error) {
			console.log(
				`Error while fetching user details for email ${email}`,
				error
			);
			reject(new Error("No user find"));
		}
	});
}

async function getUserByEmail({ email }) {
	return new Promise(async (resolve, reject) => {
		try {
			connection.query(
				`SELECT id,email,password,auth_token FROM users where email=? LIMIT 1`,
				[email],
				function (error, results, fields) {
					if (error || !results || !Array.isArray(results)) {
						reject(new Error("Error while fetching user details"));
					}
					resolve(results[0]);
				}
			);
		} catch (error) {
			console.log(
				`Error while fetching user details for email ${email}`,
				error
			);
			reject(new Error("No user find"));
		}
	});
}

module.exports = {
	checkIfUserExists,
	getUserByEmail,
};
