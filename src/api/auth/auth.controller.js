const authService = require("./auth.service");

module.exports = {
	//#region Buoi 1
	getAllUsers: async (req, res, next) => {
		let DTO = await authService.getAllUsers();
		res.status(200).json(DTO);
	},

	register: async (req, res, next) => {
		try {
			let DTO = await authService.register(req.body);

			if (DTO.error) {
				res.status(500).json(DTO.msg);
				return;
			}

			res.status(200).json(DTO.msg);
		} catch (error) {
			next(error);
		}
	},

	login: async (req, res, next) => {
		let DTO = await authService.login(req.body);

		console.log(DTO);

		if (DTO.error) {
			res.status(500).json(DTO.msg);

			return;
		}

		res.status(200).json(DTO);
	},

	//#endregion

	//#region Buoi 2
	forgetPassword: async (req, res, next) => {
		try {
			const DTO = await authService.forgetPassword(req.body);
			res.status(200).json(DTO);
		} catch (error) {
			next(error);
		}
	},

	resetPassword: async (req, res, next) => {
		try {
			const DTO = await authService.resetPassword(req.body);
			res.status(200).json(DTO);
		} catch (error) {
			next(error);
		}
	},

	//#endregion
};
