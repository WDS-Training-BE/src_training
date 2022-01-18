const nodemailer = require("nodemailer");

const { resetToken } = require("../../../db.json");

async function sendResetLink(recipient, userId, token) {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAUTH2",
			user: "nguyenduckhai8101@gmail.com",
			clientId:
				"893898283541-552orvco6rh6cd7us5l0l2vrg0qa8sed.apps.googleusercontent.com",
			clientSecret: "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",
			accessToken:
				"1//04LgOitL13TKLCgYIARAAGAQSNwF-L9IrdPeOwOoVz3IKizi6zT0Oe0LUe_08IfXCllo08aE75rvsRZC-Dt1A4uM1nRrkj7yvOPA",
			refreshToken:
				"ya29.A0ARrdaM_y-DozYOVBhZ63igixgFdq1BQ4LBlxw9buckv_3o6iS3bKjNv3zEUgeNG4-Ho0j42H3CyyxmKgIhuHYKj2Ua_w_JY0ZDkrEQ93LnI0qEnUrVn5plXFvRXzMPtI-M8_JSReplWZIds46BJ4v35hKDK0",
		},
	});

	const mailOptions = {
		from: '"Webdev training" <nguyenduckhai8101@gmail.com>',
		to: recipient,
		subject: "Reset password link",
		html: `<p>Your reset link: <b>http://localhost:3000/${token}</b></p>`, // html body
	};

	let info = await transporter.sendMail(mailOptions);

	let tokens = resetToken.filter((token) => token.userId === userId);

	if (tokens.length <= 0) {
		resetToken.push({
			userId: userId,
			resetToken: token,
		});
	}

	console.log(info);

	return info;
}

module.exports.sendResetLink = sendResetLink;
