//route endpoint /auth
const authController = require("./auth.controller");
const router = require("express").Router();

router.get("/get-all-users", authController.getAllUsers);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;

/**
 * Header: {
 *  Authorization: Bearer <jwt>
 * }
 */
