"use strict";

const ApiBase = require("./base");
const UserController = require("../../controllers/user");
const Validators = require("../../validators/user");

/**
 * Api Router
 */
class User extends ApiBase {
	/**
	 * @param {Express} app
	 * @return {Router}
	 */
	constructor(app) {
		super(app);

		const {
			createUser: createUserValidator,
			signInUser: signInUserValidator,
			ForgotPassword: forgotPasswordValidator,
		} = new Validators();
		const { createUser, signInUser, forgotPassword } = new UserController(app);

		// signup flow
		this.router.post("/signup", createUserValidator, createUser);
		this.router.post("/signin", signInUserValidator, signInUser);
		this.router.post("/forget_password", forgotPasswordValidator, forgotPassword);

		return this.router;
	}

	/**
	 * API version
	 */
	get VERSION() {
		return "1";
	}
}
module.exports = User;
