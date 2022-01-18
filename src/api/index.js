const auth = require("./auth");
const router = require("express").Router();

router.use("/auth", auth);
// router.use("/user", user);

module.exports = router;
