const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function generatePassword({ password }) {
	return bcrypt.hashSync(password, 10);
}

async function verifyPassword({ password, hash }) {
	return bcrypt.compareSync(password, hash);
}

function generateUserToken(length = 25) {
	return crypto.randomBytes(length).toString("hex");
}

module.exports = {
	generatePassword,
	verifyPassword,
	generateUserToken,
};
