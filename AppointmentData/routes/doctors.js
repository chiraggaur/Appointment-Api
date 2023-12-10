var express = require("express");
var {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
} = require("../Controllers/doctorController.js");
// import {register,login} from "../Controllers/authController.js";

const router = express.Router();
var { authenticate, restrict } = require("../auth/verifyToken.js");

router.get("/:id", authenticate, restrict(["doctor"]), getSingleDoctor);
router.put("/:id", authenticate, restrict(["admin"]), updateDoctor);
router.get("/", authenticate, restrict(["doctor"]), getAllDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

module.exports = router;
