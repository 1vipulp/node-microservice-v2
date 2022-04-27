const config = require("./../config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.mailer.send_grid_key);

async function sendEmail({
	to,
	from = config.mailer.admin_email,
	subject,
	text,
	html,
}) {
	const msg = {
		to,
		from,
		subject,
		text,
		html,
	};

    console.log(msg);
	try {
		await sgMail.send(msg);
	} catch (error) {
		console.log(
			`Error while sending email to ${to} for action ${subject}`,
			JSON.stringify(error, null, 2)
		);
		throw new Error(`Error while sending{${subject} email`);
	}
}

module.exports = {
	sendEmail,
};
