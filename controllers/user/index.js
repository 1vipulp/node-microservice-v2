"use strict";
const config = require("../../config");
const { sendEmail } = require("../mailer");
const Logger = require("./../../utils/logger");
const { insert, update } = require("./mutations");
const { checkIfUserExists, getUserByEmail } = require("./queries");
const {
	generatePassword,
	verifyPassword,
	generateUserToken,
} = require("./services");

class UserController {
	constructor() {
		this.logger = new Logger();
		this.createUser = this.createUser.bind(this);
		this.signInUser = this.signInUser.bind(this);
		this.forgotPassword = this.forgotPassword.bind(this);
	}
	//  Steps :
	//  1. check if any user exists with same email ? if yes, throw error
	//  2. insert user data into database

	async createUser(req, res) {
		const {
			email_address: email,
			first_name,
			surname_name: last_name,
			password,
			phone,
			country_of_study,
			campus,
			terms_approve,
		} = req.body;
		try {
			const { info } = this.logger;
			// check if user exists
			const isUserExists = await checkIfUserExists({ email });
			if (isUserExists) {
				return res.status(200).send({
					status: 0,
					message: "User already registered with this email",
				});
			}
			const hashPassword = await generatePassword({ password });
			const userToken = generateUserToken();
			const insertObject = {
				email,
				first_name,
				last_name,
				password: hashPassword,
				phone,
				country_of_study,
				campus,
				terms_approve,
				auth_token: userToken,
			};
			await insert("users", insertObject);
			info("New user created: %s", email);
			return res
				.status(200)
				.send({ status: 1, message: "Registration Completed Successfully" });
		} catch (error) {
			console.log(`Error while registration`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}

	async signInUser(req, res) {
		const { email, password } = req.body;
		try {
			const { info } = this.logger;
			// check if user exists
			const user = await getUserByEmail({ email });
			if (!user) {
				return res.status(200).send({
					status: 0,
					message: "No user registered with this email. Please register.",
				});
			}
			const isPasswordVerified = await verifyPassword({
				password,
				hash: user.password,
			});
			if (isPasswordVerified) {
				info("Login success for email", email);
				return res.status(200).send({
					status: 1,
					auth_token: user.auth_token,
					message: "Successfully Login.",
				});
			} else {
				info("Login Failed for email", email);
				return res
					.status(200)
					.send({ status: 0, message: "Login Failed. Incorrect credentials." });
			}
		} catch (error) {
			console.log(`Login Failed for email ${email}`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}

	// Steps:
	// 1. check if user exists with requested email, if not throw an error
	// 2. send email with new password
	// 3. update new password to user table
	// 4. response success
	async forgotPassword(req, res) {
		const { email } = req.body;
		try {
			// check if user exists
			const user = await getUserByEmail({ email });
			if (!user) {
				return res.status(200).send({
					status: 0,
					message: "No user registered with this email. Please register.",
				});
			}

			const password = generateUserToken(6);
			const hashPassword = await generatePassword({ password: password });

			// TODO: fix send grid email format
			await sendEmail({
				to: email,
				from: config.mailer.admin_email,
				subject: "Forgot Password",
				text: `Your new password id ${password}`,
				html: `<strong>Your new password for email ${email} is ${password}</strong>`,
			});

			await update("users", { email }, { password: hashPassword });
			return res.status(200).send({
				status: 1,
				message: "New password send over an email. Please check.",
			});
		} catch (error) {
			console.log(`Failed forgot password for email ${email}`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}
}

module.exports = UserController;
