const Joi = require("joi");

class Validators {
	async createUser(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					first_name: Joi.string().trim().min(3).max(50).required(),
					surname_name: Joi.string().trim().min(3).max(50).required(),
					email_address: Joi.string().email().required(),
					country_of_study: Joi.string().required(),
					password: Joi.string().required(),
					campus: Joi.string().required(),
					terms_approve: Joi.boolean().required(),
				})
				.unknown();
			const { error, value } = schema.validate(req.body, {
				abortEarly: false, // include all errors
				allowUnknown: true, // ignore unknown props
				stripUnknown: true, // remove unknown props
			});
			if (error) {
				console.error(`Error while schema validation`, error);
				return res.status(400).send({
					status: 0,
					error_type: 400,
					error_msg: "Oops.. Something went wrong.",
				});
			}
			req.body = value;
			next();
		} catch (error) {
			console.error(`Error while schema validation`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}

	async signInUser(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					email: Joi.string().email().required(),
					password: Joi.string().required(),
				})
				.unknown();
			const { error, value } = schema.validate(req.body, {
				abortEarly: false, // include all errors
				allowUnknown: true, // ignore unknown props
				stripUnknown: true, // remove unknown props
			});
			if (error) {
				console.error(`Error while schema validation`, error);
				return res.status(400).send({
					status: 0,
					error_type: 400,
					error_msg: "Oops.. Something went wrong.",
				});
			}
			req.body = value;
			next();
		} catch (error) {
			console.error(`Error while schema validation`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}

	async ForgotPassword(req, res, next) {
		try {
			const schema = Joi.object()
				.keys({
					email: Joi.string().email().required(),
				})
				.unknown();
			const { error, value } = schema.validate(req.body, {
				abortEarly: false, // include all errors
				allowUnknown: true, // ignore unknown props
				stripUnknown: true, // remove unknown props
			});
			if (error) {
				console.error(`Error while schema validation`, error);
				return res.status(400).send({
					status: 0,
					error_type: 400,
					error_msg: "Oops.. Something went wrong.",
				});
			}
			req.body = value;
			next();
		} catch (error) {
			console.error(`Error while schema validation`, error);
			return res.status(400).send({
				status: 0,
				error_type: 400,
				error_msg: "Oops.. Something went wrong.",
			});
		}
	}
}

module.exports = Validators;
