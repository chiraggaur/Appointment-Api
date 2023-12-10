var express = require("express");
var { register, login } = require("../Controllers/authController.js");
// import {register,login} from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
