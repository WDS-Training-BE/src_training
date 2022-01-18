const db = require("../../../db.json");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AppError } = require("../../common/errors/AppError");

const { v4: uuidv4 } = require("uuid");

const { sendResetLink } = require("../../common/emails/sendEmail");

module.exports = {
	getAllUsers: async () => {
		return db.users;
	},
	register: async () => {
		try {
			let { email, password } = body;

			//Kiểm tra email có trùng không?
			let filterUser = db.users.filter((user) => user.email == email);

			if (filterUser.length > 0) {
				let error = new AppError()
				throw error;
			}

			let salt = await bcrypt.genSalt(10);
			let hashPassword = await bcrypt.hash(password, salt);

			body.password = hashPassword;

			db.users.push(body);

			return {
				error: false,
				msg: "Success",
			};

			//Operational error
			//Programming error
		} catch (error) {
			errorStatusCode = error.statusCode ? error.statusCode : 500;
			throw new AppError(errorStatusCode, error.message);
		}
	},

	login: async (body) => {
		const { email, password: plainPassword } = body;
		let filterUser = db.users.filter((user) => user.email === email);

		if (filterUser.length === 1) {
			const result = await bcrypt.compare(
				plainPassword,
				filterUser[0].password
			);

			if (result.err) {
				return {
					error: true,
					msg: err,
				};
			}

			const accessToken = jwt.sign(
				{
					email: filterUser[0].email,
				},
				"secret"
			);

			const refreshToken = jwt.sign(
				{
					email: filterUser[0].email,
					accessToken: accessToken,
				},
				"secret"
			);

			if (result) {
				return {
					error: false,
					msg: "Login success",
					token: {
						accessToken,
						refreshToken,
					},
				};
			}

			return {
				error: true,
				msg: "Email hay Mat khau khong dung",
			};
		} else if (filterUser.length > 1) {
			return {
				error: true,
				msg: "email bi trung",
			};
		}

		return {
			error: true,
			msg: "Email hay Mat khau khong dung",
		};
	},

	forgetPassword: async ({ email, userId }) => {
		try {
			let info = await sendResetLink(email, userId, uuidv4());

			return {
				statusCode: 200,
				messageId: info.messageId,
				msg: "Send success",
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},

	resetPassword: async ({ token, newPassword }) => {
		try {
			//find token
			const tokens = db.resetToken.filter(
				(_token) => _token.resetToken === token
			);

			if (tokens.length === 1) {
				//find user
				let user = db.users.filter((user) => user.id === tokens[0].userId);

				if (user.length === 1) {
					let salt = await bcrypt.genSalt(10);
					let hashPassword = await bcrypt.hash(newPassword, salt);

					user[0].password = hashPassword;
				}
			}

			return {
				statusCode: 200,
				msg: "ok",
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
};
